import { useHostsApi } from "../api/hostsApi"
import { SearchHostsRequest } from "../../devot-assingment-shared"
import { Loadable } from "../../utils/loadable"
import { useState, useEffect } from "react"
import { useFormik, FormikProps } from 'formik'

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
      startDate: new Date(),
      endDate: new Date(),
      guests: 5
    },
    onSubmit: () => {}
  })

  useEffect(() => loadHosts(form.values), [form.values])

  return {
    response: state.response,
    form,
    onFormChange
  }
}