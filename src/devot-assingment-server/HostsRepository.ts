import { SearchHostsRequest, HostListItem, HostListRoom } from "../devot-assingment-shared/models"
import { AppData, Room, Booking } from "./models"
import { doOverlap, isRangeInRange } from "../utils/dates"
import { addDays } from "date-fns"
import { min } from "lodash"

export class HostsRepository {
  
  constructor(private data: AppData){
  }

  async search(req: SearchHostsRequest){

    const r: HostListItem[] = []
    const requiredDateRange: [Date, Date] = [req.startDate, req.endDate]

    for (const host of this.data.hosts) {      
      const availableRooms = this.data.rooms.reduce((acc, room) => {
          if(room.hostRef !== host.ref)
            return acc
          if(room.capacity < req.guestsCount)
            return acc
          
          const overlapingBookings = this.data.bookings.filter(b => {
            if(b.roomRef !== room.ref)
              return false
            return doOverlap(requiredDateRange, [b.startDate, b.endDate])
          })

          function includeCurrentRoom(freeCapacity: number){
            const r = {
              ref: room.ref,
              name: room.ref,
              totalCapacity: room.capacity,
              freeCapacity
            }
            return [...acc, r]
          }

          if(!overlapingBookings.length)
            return includeCurrentRoom(room.capacity)
          else {
            const compatibleOverlapingBookings = this.findCompatibleOverlapingBookings(req, room, overlapingBookings)
            if(compatibleOverlapingBookings.length){
              const totalFreeCapacity = min(compatibleOverlapingBookings.map(b => b.freeCapacity))!
              return includeCurrentRoom(totalFreeCapacity)
            }
            else
              return acc
          }
        }, [] as HostListRoom[])

      if(availableRooms.length)
        r.push({
          ref: host.ref,
          name: host.name,
          address: host.address,
          rooms: availableRooms
        })
    }

    return r
  }

  findCompatibleOverlapingBookings(req: SearchHostsRequest, room: Room, overlapingBookings: Booking[]){
    return overlapingBookings
      .reduce((acc, booking) =>
        {
          const doesSatisfy = isRangeInRange([req.startDate, req.endDate], [booking.startDate, addDays(booking.endDate, 1)]) &&
            (booking.numberOfGuests + req.guestsCount) <= room.capacity
          if(doesSatisfy){
            const mapped = {
              ...booking,
              freeCapacity: room.capacity - booking.numberOfGuests
            }
            return [...acc, mapped]
          }
          return acc
        }, [] as (Booking & { freeCapacity: number })[]
      ) 
  }
}