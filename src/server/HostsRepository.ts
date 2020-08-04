import { SearchHostsRequest } from "../shared";

export class HostsRepository {
  async search(req: SearchHostsRequest){
    return ['host 1', 'host 2']
  }
}