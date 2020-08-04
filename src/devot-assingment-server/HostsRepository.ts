import { SearchHostsRequest } from "../devot-assingment-shared";

export class HostsRepository {
  async search(req: SearchHostsRequest){
    return ['host 1', 'host 2']
  }
}