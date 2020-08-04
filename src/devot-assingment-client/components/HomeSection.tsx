import React, { useState, useEffect } from 'react';
import { useHostsApi } from '../api/hostsApi';
import { SearchHostsForm } from './SearchHostsForm';
import { makeStyles } from '@material-ui/core';
import { SearchHostsRequest } from '../../devot-assingment-shared';
import { Loadable } from '../../utils/loadable';

interface State {
  form: SearchHostsRequest
  response: Loadable<string>
}

const initialSearchFormData = {
  startDate: new Date(),
  endDate: new Date(),
  guests: 5
}

export function HomeSection() {

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

  useEffect(() => loadHosts(state.form), [])
  
  const styles = useStyles()

  return (
    <div>
      <SearchHostsForm className={styles.form} value={state.form} />
      {state.response.status === 'LOADED' && state.response.value}
    </div>
  );
}

const useStyles = makeStyles({
  form: {
    width: '180px',
    marginLeft: 10
  }
})