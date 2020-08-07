import { HostListItem, HostListRoom, SearchHostsFormInput } from "../devot-assingment-shared/models"
import { AppData, Room, Booking } from "./models"
import { doOverlap, isRangeInRange } from "../utils/dates"
import { addDays } from "date-fns"
import { min } from "lodash"

export default class HostsInMemoryRepository {
  
  constructor(private data: AppData){
  }

  async search(req: SearchHostsFormInput & { maxCount: number }){

    const r: HostListItem[] = []
    const pageBegin = this.findPageBegin(req)

    if(pageBegin === undefined)
      return r

    for (let index = pageBegin; index < this.data.hosts.length; index++) {
      if(r.length === req.maxCount)
        break
      
      const host = this.data.hosts[index];
      const availableRooms = this.findAvailableRooms(host.ref, req)

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

  findPageBegin(req: SearchHostsFormInput){
    if(req.offset === 0)
      return 0
    let hostsThatPassedTheFilterCount = 0
    for (let index = 0; index < this.data.hosts.length; index++) {
      const host = this.data.hosts[index];
      const doesPassFilter = this.findAvailableRooms(host.ref, req).length > 0
      if(doesPassFilter)
        hostsThatPassedTheFilterCount++
      if(hostsThatPassedTheFilterCount === req.offset)
        return req.offset + 1
    }
    return undefined
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