import React, { useState, useEffect } from 'react';
import { useHostsApi } from '../api/hostsApi';
import { SearchHostsForm } from './SearchHostsForm';
import { makeStyles } from '@material-ui/core';
import { SearchHostsRequest } from '../../devot-assingment-shared';

interface State {
  form: SearchHostsRequest
  response: string
}

const initialSearchFormData = {
  startDate: new Date(),
  endDate: new Date(),
  guests: 5
}

export function Root() {

  const hostsApi = useHostsApi()

  const [state, updateState] = useState<State>({
    form: initialSearchFormData,
    response: ''
  })

  function loadHosts(form: SearchHostsRequest){
    hostsApi.search(form)
      .then(r => {
        updateState(oldState => ({
          form: oldState.form,
          response: JSON.stringify(r.data, null, 2)
        }))
      })
  }

  useEffect(() => loadHosts(state.form), [])
  
  const styles = useStyles()

  return (
    <div>
      <SearchHostsForm className={styles.form} value={state.form} />
      {state.response} 
    </div>
  );
}

const useStyles = makeStyles({
  form: {
    width: '180px',
    marginLeft: 10
  }
})