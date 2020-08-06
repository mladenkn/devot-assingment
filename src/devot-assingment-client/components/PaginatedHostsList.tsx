import { Loadable as LoadableModel } from "../../utils/loadable";
import { HostListItem } from "../../devot-assingment-shared/models";
import React from "react";
import { Loadable } from "../../utils/view/Loadable";
import { HostsList } from "./HostsList";
import { makeStyles, IconButton } from "@material-ui/core";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'

type Props = {
  hosts: LoadableModel<HostListItem[]>
  offset: number
  updateOffset: (variant: 'increase' | 'decrease') => void
}

export function PaginatedHostsList(props: Props){
  const styles = useStyles()
  return (
    <div className={styles.root}>
      <Loadable
        {...props.hosts}
        className={styles.hostsListWrapperLoadable} 
        circularProgressStyle={{ width: 70, height: 70 }} 
        notLoadedClassName={styles.hostsListNotLoaded}
      >
        {hosts => <HostsList hosts={hosts} />}
      </Loadable>
      <div className={styles.navigation}>
        {props.offset !== 0 &&
          <IconButton onClick={() => props.updateOffset('decrease')}>
            <ArrowLeftIcon />
          </IconButton>
        }
        <IconButton onClick={() => props.updateOffset('increase')}>
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