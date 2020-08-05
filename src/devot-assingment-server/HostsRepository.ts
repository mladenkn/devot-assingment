import { SearchHostsRequest } from "../devot-assingment-shared/SearchHostsRequest";
import { DataFilesPaths } from "./models";
import csv from 'csvtojson'

export class HostsRepository {

  bookings?: any[]

  async initialize(files: DataFilesPaths){
    await csv()
      .fromFile(files.bookings)
      .then(a => {
        this.bookings = a
      })
  }

  async search(req: SearchHostsRequest){
    return ['host 1', 'host 2']
  }
}