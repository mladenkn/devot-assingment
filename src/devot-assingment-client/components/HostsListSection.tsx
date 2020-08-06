import React from 'react';
import { SearchHostsForm } from './SearchHostsForm';
import { makeStyles } from '@material-ui/core';
import { useHomeSectionLogic } from '../logic/homeSectionLogic';
import { SearchHostsFormInput, SearchHostsFormInputUncomplete } from '../../devot-assingment-shared/models';
import { PaginatedHostsList } from './PaginatedHostsList';

type Props = {
  formInitialValues: SearchHostsFormInput | SearchHostsFormInputUncomplete
}

export function HostsListSection(props: Props) {
  const logic = useHomeSectionLogic(props.formInitialValues)
  const styles = useStyles()

  return (
    <div className={styles.root}>
      <SearchHostsForm form={logic.form} />
      <PaginatedHostsList 
        hosts={logic.hostsList} 
        offset={logic.form.values.offset} 
        updateOffset={logic.updateHostsListOffset} 
      />
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    padding: '45px 1000px 0px 50px',
  },
})