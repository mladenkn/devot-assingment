import React from "react"
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { GetHostsRequest } from "../../shared";
import { makeStyles, Input, TextField } from "@material-ui/core";
import clsx from 'clsx'

export type Props = {
  className?: string
  value: GetHostsRequest
}

export function SearchHostsForm(props: Props){

  const styles = useStyles()

  return (
    <div className={clsx(styles.root, props.className)}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
      </MuiPickersUtilsProvider>
      <TextField label='Guests' className={styles.guestsInput} type='number' value={props.value.guests} />
    </div>
  )
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  spacing: {
    marginBottom: 10
  },
  guestsInput: {
    width: '40%'
  }
})