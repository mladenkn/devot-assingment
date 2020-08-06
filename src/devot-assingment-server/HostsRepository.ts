import { HostListItem, HostListRoom, SearchHostsFormInput } from "../devot-assingment-shared/models"
import { AppData, Room, Booking } from "./models"
import { doOverlap, isRangeInRange } from "../utils/dates"
import { addDays } from "date-fns"
import { min } from "lodash"

export class HostsRepository {
  
  constructor(private data: AppData){
  }

  async search(req: SearchHostsFormInput & { maxCount: number }){

    const r = this.data.hosts.reduce((acc, host, index) => {
      if(r.length === req.maxCount)
        return acc
      const availableRooms = this.findAvailableRooms(host.ref, req)      
      if(availableRooms.length){
        const hostMapped = {
          ref: host.ref,
          name: host.name,
          address: host.address,
          rooms: availableRooms 
        }
        return [...acc, hostMapped]
      }
      else
        return acc
    }, [] as HostListItem[])

    return r
  }

  findAvailableRooms(hostRef: string, req: SearchHostsFormInput){
    return this.data.rooms.reduce((acc, room) => {
      if(room.hostRef !== hostRef)
        return acc
      if(room.capacity < req.guestsCount)
        return acc
      
      const overlapingBookings = this.data.bookings.filter(b => {
        if(b.roomRef !== room.ref)
          return false
        return doOverlap([req.startDate, req.endDate], [b.startDate, b.endDate])
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
  }

  findCompatibleOverlapingBookings(req: SearchHostsFormInput, room: Room, overlapingBookings: Booking[]){
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