import React from "react"
import { KeyboardDatePicker } from '@material-ui/pickers';
import { SearchHostsRequest, SearchHostsRequestUncomplete } from "../../devot-assingment-shared/SearchHostsRequest";
import { makeStyles, TextField } from "@material-ui/core";
import { FormikProps } from "formik";

export type Props = {
  className?: string
  form: FormikProps<SearchHostsRequest | SearchHostsRequestUncomplete>
}

export function SearchHostsForm(props: Props){

  const styles = useStyles()
  const { form } = props

  return (
    <div className={props.className}>
      <KeyboardDatePicker
        className={styles.spacing}
        label="Start date"
        value={form.values.startDate}
        onChange={date => form.setFieldValue('startDate', date)}
      />
      <KeyboardDatePicker
        className={styles.spacing}
        label="End date"
        value={form.values.endDate}
        onChange={date => form.setFieldValue('endDate', date)}
      />
      <TextField
        className={styles.guestsInput}
        label='Guests'
        type='number'
        value={form.values.guests} 
        onChange={e => form.setFieldValue('guests', e.target.value)}
      />
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