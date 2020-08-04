import React from "react"
import { KeyboardDatePicker } from '@material-ui/pickers';
import { SearchHostsRequest, SearchHostsRequestUncomplete } from "../../devot-assingment-shared/SearchHostsRequest";
import { makeStyles, TextField, Button } from "@material-ui/core";
import { FormikProps, Form, FormikContext } from "formik";
import clsx from 'clsx'

export type Props = {
  className?: string
  form: FormikProps<SearchHostsRequest | SearchHostsRequestUncomplete>
}

export function SearchHostsForm(props: Props){

  const styles = useStyles()
  const { form } = props

  return (
    <FormikContext.Provider value={form}>
      <Form onReset={form.handleReset} onSubmit={form.handleSubmit} className={clsx(styles.root, props.className)}>
        <KeyboardDatePicker
          error={!!(form.touched.startDate && form.errors.startDate)}
          className={styles.spacing}
          label='Start date'
          value={form.values.startDate}
          onBlur={() => form.setFieldTouched('startDate')}
          onChange={date => {
            form.setFieldTouched('startDate')
            form.setFieldValue('startDate', date)
          }}
        />
        <KeyboardDatePicker
          error={!!(form.touched.endDate && form.errors.endDate)}
          className={styles.spacing}
          label="End date"
          value={form.values.endDate}
          onBlur={() => form.setFieldTouched('endDate')}
          onChange={date => {
            form.setFieldTouched('endDate')
            form.setFieldValue('endDate', date)
          }}
        />
        <TextField
          error={!!(form.touched.guests && form.errors.guests)}
          className={clsx(styles.spacing, styles.guestsInput)}
          label='Guests'
          type='number'
          value={form.values.guests}
          onBlur={() => form.setFieldTouched('guests')}
          onChange={e => form.setFieldValue('guests', e.target.value)}
        />
        <Button disabled={!form.isValid} className={styles.submitButton} variant='contained' type='submit'>Search</Button>
      </Form>
    </FormikContext.Provider>
  )
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  spacing: {
    marginRight: 20
  },
  guestsInput: {
    width: 80
  },
  submitButton: {

  }
})