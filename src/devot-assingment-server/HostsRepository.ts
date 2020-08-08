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
    const hostIds = uniq(Object.keys(grouped))
    const hostIdsOrdered = orderBy(hostIds, id => parseInt(id.slice(5)))
    const hostIdsPaged = hostIdsOrdered.slice(req.offset, req.offset + req.maxCount)
    const withPagingEntries = Object.entries(grouped).filter(([key, value]) => hostIdsPaged.includes(key))

    // map from relational to object model
    const hostListItemModels: HostListItem[] = withPagingEntries.map(([key, value]) => {
      const roomIds = uniq(value.map(i => i.roomRef))
      const rooms = roomIds.map(roomRef => {
        const whereRoomId = value.filter(i => i.roomRef === roomRef)
        const totalCapacity = whereRoomId[0].roomCapacity
        const name = whereRoomId[0].roomName
        const freeCapacity = max(whereRoomId.map(i => (i as any).freeCapacity as number)) || totalCapacity
        return { ref: roomRef, name, totalCapacity, freeCapacity }
      })
      const host = {
        ref: value[0].ref,
        name: value[0].name,
        address: value[0].address,
        rooms
      }
      return host
    })    

    return orderBy(hostListItemModels, i => parseInt(i.ref.substring(5)))
  }
}