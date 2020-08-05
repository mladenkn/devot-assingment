import { SearchHostsRequest } from "../../devot-assingment-shared/models"
import { useBaseApi } from "./base"

export function useHostsApi(){

  const baseApi = useBaseApi()

  function search(req: SearchHostsRequest){
    console.log(req)
    return baseApi.get('hosts/search/', { params: req })
  }

  return { search }
}