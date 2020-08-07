import { HostListItem, HostListRoom, SearchHostsFormInput } from "../devot-assingment-shared/models"
import { Host } from "./models"
import { Database } from './db'

export default class HostsRepository {

  constructor(private db: Database){}

  async search(req: SearchHostsFormInput & { maxCount: number }){
    const r = await this.db.table<Host>('hosts')
      .join('rooms', 'hosts.ref', 'rooms.hostRef')
      .join('bookings', 'rooms.ref', 'bookings.roomRef')
      .select({
        ref: 'hosts.ref',
        name: 'hosts.name',
        address: 'hosts.address',
        roomRef: 'rooms.ref',
        roomCapacity: 'rooms.capacity',
      })
      .select(this.db.raw('"rooms"."capacity" - "bookings"."numberOfGuests" as "freeCapacity"'))
      .where(b => {
        b.where('bookings.startDate', '<', req.startDate)
          .and.where('bookings.endDate', '>', req.endDate)
      })
      .orWhere(b => {        
        b.where('bookings.startDate', '>=', req.startDate)
          .and.where('bookings.endDate', '<=', req.endDate)
          .and.whereRaw('"rooms"."capacity" - "bookings"."numberOfGuests" > 0')
      })
      .offset(req.offset)
      .limit(20)

    return r
  }
}