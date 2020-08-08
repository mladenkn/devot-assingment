import { HostListItem, HostListRoom, SearchHostsFormInput } from "../devot-assingment-shared/models"
import { Host, Room } from "./models"
import { Database } from './db'

export default class HostsRepository {

  constructor(private db: Database){}

  async search(req: SearchHostsFormInput & { maxCount: number }){
    return this.db.table<Host>('hosts')
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
      .offset(req.offset)
      .orderByRaw('CAST(SUBSTRING("rooms"."ref", 6) AS INT)')
      .limit(20)
  }
}