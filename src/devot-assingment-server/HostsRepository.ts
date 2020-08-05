import { SearchHostsRequest } from "../devot-assingment-shared/SearchHostsRequest"
import { AppData, Room, Booking } from "./models"
import { doOverlap, isRangeInRange } from "../utils/dates"
import { addDays } from "date-fns"
import { min } from "lodash"

export class HostsRepository {
  
  constructor(private data: AppData){
  }

  async search(req: SearchHostsRequest){

    const r: any[] = []
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

          function includeCurrentRoom(freeCapacity: number, additional: object = {}){
            const r = {
              name: room.ref,
              totalCapacity: room.capacity,
              freeCapacity,
              ...additional
            }
            return [...acc, r]
          }

          if(!overlapingBookings.length)
            return includeCurrentRoom(room.capacity)
          else {
            const compatibleOverlapingBookings = this.findCompatibleOverlapingBookings(req, room, overlapingBookings)
            if(compatibleOverlapingBookings.length){
              const totalFreeCapacity = min(compatibleOverlapingBookings.map(b => b.freeCapacity))!
              return includeCurrentRoom(totalFreeCapacity, { deep: true })
            }
            else
              return acc
          }
        }, [] as any[])

      if(availableRooms.length)
        r.push({
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