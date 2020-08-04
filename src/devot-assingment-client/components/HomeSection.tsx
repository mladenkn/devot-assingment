import React from 'react';
import { SearchHostsForm } from './SearchHostsForm';
import { makeStyles } from '@material-ui/core';
import { useHomeSectionLogic } from '../logic/homeSectionLogic';

export function HomeSection() {
  const logic = useHomeSectionLogic()
  const styles = useStyles()

  return (
    <div>
      <SearchHostsForm className={styles.form} value={logic.form} />
      {logic.response.status === 'LOADED' && logic.response.value}
    </div>
  );
}

const useStyles = makeStyles({
  form: {
    width: '180px',
    marginLeft: 10
  }
})