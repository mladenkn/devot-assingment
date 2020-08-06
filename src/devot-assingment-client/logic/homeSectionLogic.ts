import { useHostsApi } from "../api/hosts"
import { SearchHostsFormInput, SearchHostsFormInputUncomplete, HostListItem } from "../../devot-assingment-shared/models"
import { LoadableList } from "../../utils/loadable"
import { useFormik } from 'formik'
import { useState } from "react"
import { useEffect } from "../../utils/useEffect"

type State = {
  hostsList: LoadableList<HostListItem[]>
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

  function loadMoreHosts(){
    updateState(curState => {
      if(curState.hostsList.status !== 'LOADED')
        throw new Error('')      
       return {
         hostsList: {
          status: 'LOADING',
          value: curState.hostsList.value
        }
      }
    })
    hostsApi.search({ ...form.values as SearchHostsFormInput, maxCount: 5, offset: 0 })
      .then(r => {
        updateState(curState => {
          if(curState.hostsList.status !== 'LOADED')
            throw new Error('')
          return ({
            hostsList: {
              status: 'LOADED',
              value: [...curState.hostsList.value, ...r.data]
            }
          })
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
    loadMoreHosts
  }
}