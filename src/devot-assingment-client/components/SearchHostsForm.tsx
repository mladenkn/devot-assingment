import React from "react"
import { KeyboardDatePicker } from '@material-ui/pickers';
import { SearchHostsRequest } from "../../devot-assingment-shared";
import { makeStyles, TextField } from "@material-ui/core";
import { FormikProps } from "formik";

export type Props = {
  className?: string
  form: FormikProps<SearchHostsRequest>
}

export function SearchHostsForm(props: Props){

  const styles = useStyles()

  return (
    <div className={props.className}>
      <KeyboardDatePicker
        className={styles.spacing}
        label="Start date"
        value={props.form.values.startDate}
        onChange={() => {}}
      />
      <KeyboardDatePicker
        className={styles.spacing}
        label="End date"
        value={props.form.values.endDate}
        onChange={() => {}}
      />
      <TextField label='Guests' className={styles.guestsInput} type='number' value={props.form.values.guests} />
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