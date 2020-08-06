import { Loadable } from "../../utils/loadable";
import { HostListItem } from "../../devot-assingment-shared/models";
import React from "react";
import { LoadableList } from "../../utils/view/LoadableList";
import { HostsList } from "./HostsList";
import { makeStyles, IconButton } from "@material-ui/core";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'

type Props = {
  hosts: Loadable<HostListItem[]>
}

export function PaginatedHostsList(props: Props){
  const styles = useStyles()
  return (
    <div className={styles.root}>
      <LoadableList
      {...props.hosts}
      className={styles.hostsListWrapperLoadable} 
      circularProgressStyle={{ width: 70, height: 70 }} 
      notLoadedClassName={styles.hostsListNotLoaded}
      >
        {hosts => <HostsList hosts={hosts} />}
      </LoadableList>
      <div className={styles.navigation}>
        <IconButton>
          <ArrowLeftIcon />
        </IconButton>
        <IconButton>
          <ArrowRightIcon />
        </IconButton>
      </div>
    </div>    
  )
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  hostsListWrapperLoadable: {
    marginTop: 10
  },
  hostsListNotLoaded: {
    width: 600,
    height: 400
  },
  navigation: {
    alignSelf: 'flex-end'
  }
})