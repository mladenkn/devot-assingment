import { useHostsApi } from "../api/hostsApi"
import { SearchHostsRequest } from "../../devot-assingment-shared"
import { Loadable } from "../../utils/loadable"
import { useState, useEffect } from "react"

type State = {
  form: SearchHostsRequest
  response: Loadable<string>
}

type HomeSectionLogic = {  
  onFormChange(form: SearchHostsRequest): void
} & State

const initialSearchFormData = {
  startDate: new Date(),
  endDate: new Date(),
  guests: 5
}

export function useHomeSectionLogic(): HomeSectionLogic{ 

  const hostsApi = useHostsApi()

  const [state, updateState] = useState<State>({
    form: initialSearchFormData,
    response: {
      status: 'LOADING'
    }
  })

  function loadHosts(form: SearchHostsRequest){
    updateState(oldState => ({
      form: oldState.form,
      response: {
        status: 'LOADING'
      }
    }))
    hostsApi.search(form)
      .then(r => {
        updateState(oldState => ({
          form: oldState.form,
          response: {
            status: 'LOADED',
            value: JSON.stringify(r.data, null, 2)
          }
        }))
      })
  }

  function onFormChange(form: SearchHostsRequest){
    updateState(oldState => ({
      form,
      response: oldState.response
    }))
  }

  useEffect(() => loadHosts(state.form), [state.form])

  return {
    ...state,
    onFormChange
  }
}