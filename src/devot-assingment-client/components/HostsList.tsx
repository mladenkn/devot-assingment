import { HostListItem } from "../../devot-assingment-shared/models";
import React from "react";
import { makeStyles } from "@material-ui/core";

type Props = {
  className?: string
  hosts: HostListItem[]
}

export function HostsList(props: Props){
  const styles = useStyles()
  return (
    <div className={props.className}>
      {props.hosts.map(h => (
        <div className={styles.item} key={h.ref}>
          <div>{h.ref}: {h.name}</div>
          <div>{h.address}</div>
          {h.rooms.map(r => (
            <div key={r.ref}>
              {r.name} is available ({r.totalCapacity - r.freeCapacity} booked, {r.freeCapacity} free out of {r.totalCapacity} total)
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const useStyles = makeStyles({
  item: {
    marginBottom: 10
  }
})