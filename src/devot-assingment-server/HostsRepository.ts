import { HostListItem, SearchHostsFormInput } from "../devot-assingment-shared/models"
import { Host } from "./models"
import { Database } from './db'
import { groupBy, uniq, orderBy, max } from "lodash"

export default class HostsRepository {

  constructor(private db: Database){}

  async search(req: SearchHostsFormInput & { maxCount: number }){
    const withNoPaging = await this.db.table<Host>('hosts')
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

    // ne znam napravit paginaciju na bazi bez ORM-a :(
    // pa to radim u memoriji od servera

    const grouped = groupBy(withNoPaging, h => h.ref)
    const hostRefs = uniq(Object.keys(grouped))
    const hostRefsOrdered = orderBy(hostRefs, id => parseInt(id.slice(5)))
    const hostRefsPaged = hostRefsOrdered.slice(req.offset, req.offset + req.maxCount)

    // map from relational to object model
    const hostListItemModels: HostListItem[] = hostRefsPaged.map(hostRef => {
      const row = grouped[hostRef]
      const roomRefs = uniq(row.map(i => i.roomRef))
      const rooms = roomRefs.map(roomRef => {
        const whereRoomId = row.filter(i => i.roomRef === roomRef)
        const totalCapacity = whereRoomId[0].roomCapacity
        const name = whereRoomId[0].roomName
        const freeCapacity = max(whereRoomId.map(i => (i as any).freeCapacity as number)) || totalCapacity
        return { ref: roomRef, name, totalCapacity, freeCapacity }
      })
      const host = {
        ref: row[0].ref,
        name: row[0].name,
        address: row[0].address,
        rooms
      }
      return host
    })    

    return hostListItemModels
  }
}