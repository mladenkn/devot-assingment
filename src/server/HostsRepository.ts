import { GetHostsRequest } from "../shared";

export class HostsRepository {
  async search(req: GetHostsRequest){
    return ['host 1', 'host 2']
  }
}