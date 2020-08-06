import { useHostsApi } from "../api/hosts"
import { SearchHostsFormInput, SearchHostsFormInputUncomplete, HostListItem } from "../../devot-assingment-shared/models"
import { useFormik } from 'formik'
import { useState } from "react"
import { useEffect } from "../../utils/useEffect"
import { Loadable } from "../../utils/loadable"

type State = {
  hostsList: Loadable<HostListItem[]>
}

function validateFormValues(values: SearchHostsFormInput | SearchHostsFormInputUncomplete){
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

export function useHomeSectionLogic(formInitialValues: SearchHostsFormInput | SearchHostsFormInputUncomplete) { 

  const hostsApi = useHostsApi()

  const [state, updateState] = useState<State>({
    hostsList: {
      status: 'LOADING'
    }
  })

  function loadHosts(form: SearchHostsFormInput){
    updateState({
      hostsList: {
        status: 'LOADING'
      }
    })
    hostsApi.search({ ...form, maxCount: 5, offset: 0 })
      .then(r => {
        updateState({
          hostsList: {
            status: 'LOADED',
            value: r.data
          }
        })
      })
  }

  const form = useFormik({
    initialValues: formInitialValues,
    onSubmit: v => loadHosts(v as SearchHostsFormInput),
    validate: validateFormValues
  })

  useEffect(() => {
    form.isValid && loadHosts(form.values as SearchHostsFormInput)
  }, [form.values], { runOnFirstRender: true })

  return {
    hostsList: state.hostsList,
    form,
  }
}