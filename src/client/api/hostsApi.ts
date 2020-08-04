import { GetHostsRequest, serializeGetHostsRequest } from "../../../shared";
import axios from 'axios'
import { format } from 'date-fns'

export function useHostsApi(){

  function get(req: GetHostsRequest){
    const params = {
      startDate: format(req.startDate, 'yyyy-MM-dd'),
      endDate: format(req.startDate, 'yyyy-MM-dd'),
      guests: req.guests
    }
    return axios.get('http://localhost:3001/hosts/search/', { params: serializeGetHostsRequest(req) })
  }

  return { get }
}