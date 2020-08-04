import { GetHostsRequest, serializeGetHostsRequest } from "../../shared";
import axios from 'axios'

export function useHostsApi(){

  function get(req: GetHostsRequest){
    return axios.get('http://localhost:3001/hosts/search/', { params: serializeGetHostsRequest(req) })
  }

  return { get }
}