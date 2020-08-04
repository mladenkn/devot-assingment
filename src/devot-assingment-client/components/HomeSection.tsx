import React from 'react';
import { SearchHostsForm } from './SearchHostsForm';
import { makeStyles } from '@material-ui/core';
import { useHomeSectionLogic } from '../logic/homeSectionLogic';

export function HomeSection() {
  const logic = useHomeSectionLogic()
  const styles = useStyles()

  return (
    <div className={styles.root}>
      <SearchHostsForm value={logic.form} />
      {logic.response.status === 'LOADED' && logic.response.value}
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    padding: '45px 700px 0px 50px',
  },
})