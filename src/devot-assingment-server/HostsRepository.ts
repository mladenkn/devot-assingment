import { HostListItem, HostListRoom, SearchHostsFormInput } from "../devot-assingment-shared/models"
import { Host, Room } from "./models"
import { Database } from './db'
import { groupBy, uniqBy, uniq, orderBy, flatten } from "lodash"

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
        roomCapacity: 'rooms.capacity',
        bookingNumberOfGuests: 'bookings.numberOfGuests',
        bookingRef: 'bookings.ref'
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
    const withPaging = flatten(Object.entries(grouped).filter(([key, value]) => hostIdsPaged.includes(key)).map(([key, value]) => value))

    

    return withPaging
  }
}