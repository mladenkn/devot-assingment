import { SearchHostsRequest, serializeGetHostsRequest } from "../../shared";
import axios from 'axios'

export function useHostsApi(){

  function search(req: SearchHostsRequest){
    return axios.get('http://localhost:3001/hosts/search/', { params: serializeGetHostsRequest(req) })
  }

  return { search }
}