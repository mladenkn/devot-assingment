import React from 'react';
import { SearchHostsForm } from './SearchHostsForm';
import { makeStyles } from '@material-ui/core';
import { useHomeSectionLogic } from '../logic/homeSectionLogic';
import { SearchHostsFormInput, SearchHostsFormInputUncomplete } from '../../devot-assingment-shared/models';
import { HostsList } from './HostList';
import { LoadableList } from '../../utils/view/LoadableList';

type Props = {
  formInitialValues: SearchHostsFormInput | SearchHostsFormInputUncomplete
}

export function HostsListSection(props: Props) {
  const logic = useHomeSectionLogic(props.formInitialValues)
  const styles = useStyles()

  return (
    <div className={styles.root}>
      <SearchHostsForm form={logic.form} />
      <LoadableList
        {...logic.hostsList}
        className={styles.hostsListWrapperLoadable} 
        circularProgressStyle={{ width: 70, height: 70 }} 
        notLoadedClassName={styles.hostsListNotLoaded}
      >
        {hosts => <HostsList hosts={hosts} />}
      </LoadableList>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    padding: '45px 700px 0px 50px',
  },
  hostsListWrapperLoadable: {
    marginTop: 10
  },
  hostsListNotLoaded: {
    width: 600,
    height: 400
  },
  circularProgress: {
    width: 60
  }
})