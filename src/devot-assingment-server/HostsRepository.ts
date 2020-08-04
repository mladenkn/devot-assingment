import { SearchHostsRequest } from "../devot-assingment-shared/SearchHostsRequest";
import { DataFilesPaths } from "./models";

export class HostsRepository {

  async initialize(files: DataFilesPaths){
    
  }

  async search(req: SearchHostsRequest){
    return ['host 1', 'host 2']
  }
}