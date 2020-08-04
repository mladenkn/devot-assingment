import { SearchHostsRequest, serialize } from "../../devot-assingment-shared/SearchHostsRequest";
import axios from 'axios'

export function useHostsApi(){

  function search(req: SearchHostsRequest){
    return axios.get('http://localhost:3001/hosts/search/', { params: serialize(req) })
  }

  return { search }
}