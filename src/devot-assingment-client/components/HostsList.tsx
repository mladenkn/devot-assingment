import React from 'react';
import { SearchHostsForm } from './SearchHostsForm';
import { makeStyles } from '@material-ui/core';
import { useHomeSectionLogic } from '../logic/homeSectionLogic';
import { SearchHostsRequest, SearchHostsRequestUncomplete } from '../../devot-assingment-shared/SearchHostsRequest';

type Props = {
  formInitialValues: SearchHostsRequest | SearchHostsRequestUncomplete
}

export function HostsList(props: Props) {
  const logic = useHomeSectionLogic(props.formInitialValues)
  const styles = useStyles()

  return (
    <div className={styles.root}>
      <SearchHostsForm form={logic.form} />
      {logic.response.status === 'LOADED' && <pre>{logic.response.value}</pre>}
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    padding: '45px 700px 0px 50px',
  },
})