import { HostListItem, SearchHostsFormInput } from "../devot-assingment-shared/models"
import { Host } from "./models"
import { Database } from './db'
import { uniq, max } from "lodash"

export default class HostsRepository {

  constructor(private db: Database){}

  async search(req: SearchHostsFormInput & { maxCount: number }){
    const hostRefs = await this.db.table<Host>('hosts')
      .join('rooms', 'hosts.ref', 'rooms.hostRef')
      .leftJoin('bookings', 'rooms.ref', 'bookings.roomRef')
      .distinct('hosts.ref')
      .distinct(this.db.raw('CAST(SUBSTRING("hosts"."ref", 6) AS INT)'))
      .whereNull('bookings.ref')
      .orWhere(b => {
        b.where('bookings.startDate', '<', req.startDate)
          .and.where('bookings.endDate', '>', req.endDate)
      })
      .orWhere(b => {        
        b.where('bookings.startDate', '>=', req.startDate)
          .and.where('bookings.endDate', '<=', req.endDate)
          .and.whereRaw('"rooms"."capacity" - "bookings"."numberOfGuests" >= ?', [req.guestsCount])
      })
      .orderByRaw('CAST(SUBSTRING("hosts"."ref", 6) AS INT)')
      .offset(req.offset)
      .limit(req.maxCount)
      .pluck('hosts.ref')

    const rows = await this.db.table<Host>('hosts')
      .join('rooms', 'hosts.ref', 'rooms.hostRef')
      .leftJoin('bookings', 'rooms.ref', 'bookings.roomRef')
      .select({
        ref: 'hosts.ref',
        name: 'hosts.name',
        address: 'hosts.address',
        roomRef: 'rooms.ref',
        roomName: 'rooms.ref',
        roomCapacity: 'rooms.capacity',
      })
      .select(this.db.raw('"rooms"."capacity" - "bookings"."numberOfGuests" as "freeCapacity"'))
      .whereIn('hosts.ref', hostRefs)
    
    // map from relational to object model
    const hostListItemModels: HostListItem[] = hostRefs.map(hostRef => {
      const rowsOfHost = rows.filter(r => r.ref === hostRef)
      const roomRefs = uniq(rowsOfHost.map(i => i.roomRef))
      const rooms = roomRefs.map(roomRef => {
        const whereRoomId = rowsOfHost.filter(i => i.roomRef === roomRef)
        const totalCapacity = whereRoomId[0].roomCapacity
        const name = whereRoomId[0].roomName
        const freeCapacity = max(whereRoomId.map(i => (i as any).freeCapacity as number)) || totalCapacity
        return { ref: roomRef, name, totalCapacity, freeCapacity }
      })
      const host = {
        ref: rowsOfHost[0].ref,
        name: rowsOfHost[0].name,
        address: rowsOfHost[0].address,
        rooms
      }
      return host
    })

    return hostListItemModels
  }
}