import { useHostsApi } from "../api/hosts"
import { SearchHostsRequest, SearchHostsRequestUncomplete, HostListItem } from "../../devot-assingment-shared/models"
import { Loadable } from "../../utils/loadable"
import { useFormik } from 'formik'
import { useState } from "react"
import { useEffect } from "../../utils/useEffect"

type State = {
  response: Loadable<HostListItem[]>
}

function validateFormValues(values: SearchHostsRequest | SearchHostsRequestUncomplete){
  const r: any = {}
  
  if(!values.startDate)
    r.startDate = 'Start Date is required'
  
  if(!values.endDate)
    r.endDate = 'End Date is required'
  
  if(!values.guestsCount)
    r.guestsCount = 'Guests field is required'

  console.log(r)
  
  return r  
}

export function useHomeSectionLogic(formInitialValues: SearchHostsRequest | SearchHostsRequestUncomplete) { 

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
            value: r.data
          }
        })
      })
  }

  const form = useFormik({
    initialValues: formInitialValues,
    onSubmit: v => loadHosts(v as SearchHostsRequest),
    validate: validateFormValues
  })

  useEffect(() => {
    form.isValid && loadHosts(form.values as SearchHostsRequest)
  }, [form.values], { runOnFirstRender: true })

  return {
    response: state.response,
    form
  }
}