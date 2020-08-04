import React from "react"
import { KeyboardDatePicker } from '@material-ui/pickers';
import { SearchHostsRequest } from "../../devot-assingment-shared";
import { makeStyles, TextField } from "@material-ui/core";

export type Props = {
  className?: string
  value: SearchHostsRequest
}

export function SearchHostsForm(props: Props){

  const styles = useStyles()

  return (
    <div className={props.className}>
      <KeyboardDatePicker
        className={styles.spacing}
        label="Start date"
        value={props.value.startDate}
        onChange={() => {}}
      />
      <KeyboardDatePicker
        className={styles.spacing}
        label="End date"
        value={props.value.endDate}
        onChange={() => {}}
      />
      <TextField label='Guests' className={styles.guestsInput} type='number' value={props.value.guests} />
    </div>
  )
}

const useStyles = makeStyles({
  spacing: {
    marginRight: 20
  },
  guestsInput: {
    width: 70
  }
})