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
  
  return r  
}

const hostsListPageSize = 5

export function useHomeSectionLogic(formInitialValues: SearchHostsFormInput | SearchHostsFormInputUncomplete) { 

  const hostsApi = useHostsApi()

  const form = useFormik({
    initialValues: formInitialValues,
    onSubmit: loadHosts,
    validate: validateFormValues
  })

  const [state, updateState] = useState<State>({
    hostsList: {
      status: 'LOADING'
    }
  })

  function loadHosts(){
    updateState({
      hostsList: {
        status: 'LOADING'
      }
    })
    const formInput = form.values as SearchHostsFormInput
    hostsApi.search({ ...formInput, maxCount: hostsListPageSize })
      .then(r => {
        updateState({
          hostsList: {
            status: 'LOADED',
            value: r.data
          }
        })
      })
  }

  function updateHostsListOffset(variant: 'increase' | 'decrease'){
    const offset = variant === 'increase' ? form.values.offset + hostsListPageSize : form.values.offset - hostsListPageSize
    form.setFieldValue('offset', offset)
  }

  useEffect(() => {
    form.isValid && loadHosts()
  }, [form.values], { runOnFirstRender: true })

  return {
    hostsList: state.hostsList,
    form,
    updateHostsListOffset
  }
}