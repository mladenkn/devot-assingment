import React from 'react';
import { useHostsApi } from '../api/hostsApi';
import { SearchHostsForm } from './SearchHostsForm';
import { makeStyles } from '@material-ui/core';

export function Root() {

  const hostsApi = useHostsApi()
  const initialSearchFormData = {
    startDate: new Date(),
    endDate: new Date(),
    guests: 5
  }

  hostsApi.search(initialSearchFormData)
    .then(console.log)

  const styles = useStyles()

  return (
    <div>
      <SearchHostsForm className={styles.form} value={initialSearchFormData} />    
    </div>
  );
}

const useStyles = makeStyles({
  form: {
    width: '180px',
    marginLeft: 10
  }
})