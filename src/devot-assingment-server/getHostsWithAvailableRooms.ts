import { HostListItem, SearchHostsFormInput, HostListRoom } from "../devot-assingment-shared/models"
import { Host, Room } from "./models"
import { Database } from './db'
import { uniq, max } from "lodash"
import { QueryBuilder } from 'knex'

export default async function(db: Database, req: SearchHostsFormInput & { maxCount: number }){
  
  function bookingPeriodsDontOverlap(b: QueryBuilder){
    return b
      .where('bookings.startDate', '>', req.endDate)
      .or.where('bookings.endDate', '<', req.startDate)
  }

  function createBaseQuery(){
    return db.table<Host>('hosts')
      .join('rooms', 'hosts.ref', 'rooms.hostRef')
      .leftJoin('bookings', 'rooms.ref', 'bookings.roomRef')
      .whereNull('bookings.ref')
      .orWhere(bookingPeriodsDontOverlap)
      .orWhere(b => {        
        b.whereNot(bookingPeriodsDontOverlap)
          .and.whereRaw('"rooms"."capacity" - "bookings"."numberOfGuests" >= ?', [req.guestsCount])
      })    
  }

  const pagedHostRefs = await createBaseQuery()
    .distinct('hosts.ref')
    .distinct(db.raw('CAST(SUBSTRING("hosts"."ref", 6) AS INT)'))
    .orderByRaw('CAST(SUBSTRING("hosts"."ref", 6) AS INT)')
    .offset(req.offset)
    .limit(req.maxCount)
    .pluck('hosts.ref')

  const rows = await createBaseQuery()
    .select({
      hostRef: 'hosts.ref',
      name: 'hosts.name',
      address: 'hosts.address',
      roomRef: 'rooms.ref',
      roomName: 'rooms.ref',
      roomCapacity: 'rooms.capacity',
      bookingsNnumberOfGuests: 'bookings.numberOfGuests',
      bookingRef: 'bookings.ref'
    })
    .select(db.raw('"rooms"."capacity" - "bookings"."numberOfGuests" as "freeCapacity"'))
    .whereIn('hosts.ref', pagedHostRefs)

  // map from relational to object model
  const hostListItemModels: HostListItem[] = pagedHostRefs.map(hostRef => {
    const rowsOfHost = rows.filter(r => r.hostRef === hostRef)
    const roomRefs = uniq(rowsOfHost.map(i => i.roomRef))
    const rooms = roomRefs.map(roomRef => {
      const whereRoomId = rowsOfHost.filter(i => i.roomRef === roomRef)
      const totalCapacity = whereRoomId[0].roomCapacity
      const name = whereRoomId[0].roomName
      const freeCapacity = max(whereRoomId.map(i => (i as any).freeCapacity as number)) || totalCapacity
      return { ref: roomRef, name, totalCapacity, freeCapacity }
    })
    const host = {
      ref: rowsOfHost[0].hostRef,
      name: rowsOfHost[0].name,
      address: rowsOfHost[0].address,
      rooms
    }
    return host
  })
  
  return hostListItemModels
}