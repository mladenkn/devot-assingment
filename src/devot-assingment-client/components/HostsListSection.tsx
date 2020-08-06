import React from 'react';
import { SearchHostsForm } from './SearchHostsForm';
import { makeStyles } from '@material-ui/core';
import { useHomeSectionLogic } from '../logic/homeSectionLogic';
import { SearchHostsFormInput, SearchHostsFormInputUncomplete } from '../../devot-assingment-shared/models';
import { HostsList } from './HostList';
import { Loadable } from '../../utils/view/Loadable';

type Props = {
  formInitialValues: SearchHostsFormInput | SearchHostsFormInputUncomplete
}

export function HostsListSection(props: Props) {
  const logic = useHomeSectionLogic(props.formInitialValues)
  const styles = useStyles()

  return (
    <div className={styles.root}>
      <SearchHostsForm form={logic.form} />
      <Loadable
        {...logic.hostsList}
        className={styles.hostsListWrapper} 
        circularProgressStyle={{ width: 70, height: 70 }} 
        notLoadedClassName={styles.hostsListNotLoaded}
      >
        {hosts => <HostsList hosts={hosts} />}
      </Loadable>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    padding: '45px 700px 0px 50px',
  },
  hostsListWrapper: {
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