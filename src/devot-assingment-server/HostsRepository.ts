import { SearchHostsRequest } from "../devot-assingment-shared/SearchHostsRequest";

export class HostsRepository {
  async search(req: SearchHostsRequest){
    return ['host 1', 'host 2']
  }
}