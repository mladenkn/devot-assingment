import { useHostsApi } from "../api/hostsApi"
import { SearchHostsRequest, SearchHostsRequestUncomplete } from "../../devot-assingment-shared/SearchHostsRequest"
import { Loadable } from "../../utils/loadable"
import { useFormik } from 'formik'
import { useState } from "react"
import { useEffect } from "../../utils/useEffect"

type State = {
  response: Loadable<string>
}

export function useHomeSectionLogic() { 

  const hostsApi = useHostsApi()

  const [state, updateState] = useState<State>({
    response: {
      status: 'LOADING'
    }
  })

  function loadHosts(form: SearchHostsRequest){
    updateState({
      response: {
        status: 'LOADING'
      }
    })
    hostsApi.search(form)
      .then(r => {
        updateState({
          response: {
            status: 'LOADED',
            value: JSON.stringify(r.data, null, 2)
          }
        })
      })
  }

  function onFormChange(form: SearchHostsRequest){
    updateState(oldState => ({
      form,
      response: oldState.response
    }))
  }

  const form = useFormik({
    initialValues: {
      startDate: null,
      endDate: null,
      guests: null
    } as SearchHostsRequest | SearchHostsRequestUncomplete,
    onSubmit: () => {}
  })

  useEffect(() => loadHosts(form.values as SearchHostsRequest), [form.values])

  return {
    response: state.response,
    form,
    onFormChange
  }
}