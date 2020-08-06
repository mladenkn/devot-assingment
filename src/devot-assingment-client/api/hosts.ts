import { HostListItem, SearchHostsFormInput } from "../../devot-assingment-shared/models"
import { useBaseApi } from "./base"

export function useHostsApi(){

  const baseApi = useBaseApi()

  function search(req: SearchHostsFormInput & { maxCount: number }){
    return baseApi.get<HostListItem[]>('hosts/search/', { params: req })
  }

  return { search }
}