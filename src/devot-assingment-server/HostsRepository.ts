import { SearchHostsRequest } from "../devot-assingment-shared/SearchHostsRequest"
import { AppData } from "./models"

export class HostsRepository {
  
  constructor(data: AppData){

  }

  async search(req: SearchHostsRequest){
    return ['host 1', 'host 2']
  }
}