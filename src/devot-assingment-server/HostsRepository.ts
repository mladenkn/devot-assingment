import { SearchHostsRequest } from "../devot-assingment-shared/SearchHostsRequest"
import { AppData } from "./models"
import { doOverlap } from "../utils/dates"

export class HostsRepository {
  
  constructor(private data: AppData){
  }

  async search(req: SearchHostsRequest){
    return this.data.hosts
      .map(host => {
        const rooms = this.data.rooms.filter(r => r.hostRef === host.ref)
        const roomRefs = rooms.map(r => r.ref)
        const bookings = this.data.bookings.filter(b => roomRefs.includes(b.roomRef))    
        return { host, rooms, roomRefs, bookings }
      })
      .filter(({ bookings }) => {        
        const overLapingBookings = bookings
          .filter(b => {
            return doOverlap([req.startDate, req.endDate], [b.startDate, b.endDate])
          })
          
        return overLapingBookings.length == 0
      })
      .map(({ host, rooms }) => {
        return {
          name: host.name,
          rooms: rooms.map(r => ({ name: r.ref, capacity: r.capacity }))
        }
      })
  }
}