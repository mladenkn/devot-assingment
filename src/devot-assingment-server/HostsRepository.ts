import { SearchHostsRequest } from "../devot-assingment-shared/SearchHostsRequest"
import { AppData } from "./models"
import { doOverlap } from "../utils/dates"

export class HostsRepository {
  
  constructor(private data: AppData){
  }

  async search(req: SearchHostsRequest){
    return this.data.hosts.filter(host => {
      const rooms = this.data.rooms.filter(r => r.hostRef === host.ref)
      const roomRefs = rooms.map(r => r.ref)
      const bookings = this.data.bookings.filter(b => roomRefs.includes(b.roomRef))

      console.log('search', host, rooms, bookings)
      
      const overLapingBookings = bookings
        .filter(b => {
          return doOverlap([req.startDate, req.endDate], [b.startDate, b.endDate])
        })
        
      return overLapingBookings.length == 0
    })
  }
}