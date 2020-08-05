import { SearchHostsRequest } from "../devot-assingment-shared/SearchHostsRequest"
import { AppData } from "./models"
import { doOverlap } from "../utils/dates"

export class HostsRepository {
  
  constructor(private data: AppData){
  }

  async search(req: SearchHostsRequest){

    const r: any[] = []

    for (const host of this.data.hosts) {
      const rooms = this.data.rooms.filter(r => r.hostRef === host.ref)
      const roomRefs = rooms.map(r => r.ref)
      const bookings = this.data.bookings.filter(b => roomRefs.includes(b.roomRef))

      const overLapingBookings = bookings
        .filter(b => {
          const r = doOverlap([req.startDate, req.endDate], [b.startDate, b.endDate])
          console.log('Gledan je li se rangevi poklapaju', [req.startDate, req.endDate], [b.startDate, b.endDate], r)
          return r
        })

        // overLapingBookings.length && console.log('HostsRepository:24', overLapingBookings)
    }

    return r
  }
}