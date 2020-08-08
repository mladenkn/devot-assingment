import { HostListItem, SearchHostsFormInput, HostListRoom } from "../devot-assingment-shared/models"
import { Host, Room } from "./models"
import { Database } from './db'
import { uniq, max } from "lodash"
import { QueryBuilder } from 'knex'

export default class HostsRepository {

  constructor(private db: Database){}

  async search(req: SearchHostsFormInput & { maxCount: number }){

    function bookingPeriodsDontOverlap(b: QueryBuilder){
      return b.where('bookings.startDate', '>', req.endDate)
        .or.where('bookings.endDate', '<', req.startDate)
    }

    // const availableRoomsRefs = await this.db.table<Room>('rooms')
    //   .leftJoin('bookings', 'rooms.ref', 'bookings.roomRef')
    //   .distinct('rooms.ref')
    //   .distinct(this.db.raw('CAST(SUBSTRING("rooms"."ref", 6) AS INT)'))
    //   .whereNull('bookings.ref')
    //   .orWhere(bookingPeriodsDontOverlap)
    //   .orWhere(b => {        
    //     b.whereNot(bookingPeriodsDontOverlap)
    //       .and.whereRaw('"rooms"."capacity" - "bookings"."numberOfGuests" >= ?', [req.guestsCount])
    //   })
    //   .orderByRaw('CAST(SUBSTRING("rooms"."ref", 6) AS INT)')
      // .offset(req.offset)
      // .limit(req.maxCount)
      // .pluck('rooms.ref')

    const rows = await this.db.table<Host>('hosts')
      .join('rooms', 'hosts.ref', 'rooms.hostRef')
      .leftJoin('bookings', 'rooms.ref', 'bookings.roomRef')
      .select({
        hostRef: 'hosts.ref',
        name: 'hosts.name',
        address: 'hosts.address',
        roomRef: 'rooms.ref',
        roomName: 'rooms.ref',
        roomCapacity: 'rooms.capacity',
      })
      .select(this.db.raw('"rooms"."capacity" - "bookings"."numberOfGuests" as "freeCapacity"'))
      .whereNull('bookings.ref')
      .orWhere(bookingPeriodsDontOverlap)
      .orWhere(b => {        
        b.whereNot(bookingPeriodsDontOverlap)
          .and.whereRaw('"rooms"."capacity" - "bookings"."numberOfGuests" >= ?', [req.guestsCount])
      })

    const hostRefs = uniq(rows.map(r => r.hostRef))
    
    // map from relational to object model
    const hostListItemModels: HostListItem[] = hostRefs.map(hostRef => {
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
}