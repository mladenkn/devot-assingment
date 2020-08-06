import { SearchHostsFormInput, HostListItem } from "../../devot-assingment-shared/models"
import { useBaseApi } from "./base"

export function useHostsApi(){

  const baseApi = useBaseApi()

  function search(req: SearchHostsFormInput){
    console.log(req)
    return baseApi.get<HostListItem[]>('hosts/search/', { params: req })
  }

  return { search }
}