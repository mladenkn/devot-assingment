import { HostListItem, HostListRoom, SearchHostsFormInput } from "../devot-assingment-shared/models"
import { Host } from "./models"
import { Database } from './db'

export default class HostsRepository {

  constructor(private db: Database){}

  async search(req: SearchHostsFormInput & { maxCount: number }){
    const r = await this.db.table<Host>('hosts')
      .select('*')
      .offset(req.offset)
      .limit(req.maxCount)

    return r
  }
}