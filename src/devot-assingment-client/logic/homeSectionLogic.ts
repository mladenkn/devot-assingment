import { useHostsApi } from "../api/hosts"
import { SearchHostsRequest, SearchHostsRequestUncomplete } from "../../devot-assingment-shared/SearchHostsRequest"
import { Loadable } from "../../utils/loadable"
import { useFormik } from 'formik'
import { useState } from "react"
import { isBefore, isAfter } from "date-fns"

type State = {
  response: Loadable<string>
}

function validateFormValues(values: SearchHostsRequest | SearchHostsRequestUncomplete){
  const r: any = {}
  
  if(!values.startDate)
    r.startDate = 'Start Date is required'
  else if (!values.endDate ? false : isAfter(values.startDate, values.endDate))
    r.startDate = 'Start Date should be before End date'
  
  if(!values.endDate)
    r.endDate = 'End Date is required'
  else if (!values.startDate ? false : isBefore(values.endDate, values.startDate))
    r.endDate = 'End Date should be after Start date'
  
  if(!values.guests)
    r.guests = 'Guests field is required'
  else if(values.guests < 1)
    r.guests = 'Invalid input'

  console.log('homeSectionLogic:31', values, r)
  
  return r  
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

  const form = useFormik({
    initialValues: {
      startDate: null,
      endDate: null,
      guests: undefined
    } as SearchHostsRequest | SearchHostsRequestUncomplete,
    onSubmit: v => loadHosts(v as SearchHostsRequest),
    validate: validateFormValues
  })

  return {
    response: state.response,
    form
  }
}