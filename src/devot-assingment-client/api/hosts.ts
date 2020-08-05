import { SearchHostsRequest, serialize } from "../../devot-assingment-shared/SearchHostsRequest"
import { useBaseApi } from "./base"

export function useHostsApi(){

  const baseApi = useBaseApi()

  function search(req: SearchHostsRequest){
    return baseApi.get('hosts/search/', { params: serialize(req) })
  }

  return { search }
}