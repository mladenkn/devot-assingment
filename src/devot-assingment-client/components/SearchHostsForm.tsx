import React from "react"
import { KeyboardDatePicker } from '@material-ui/pickers';
import { SearchHostsRequest, SearchHostsRequestUncomplete } from "../../devot-assingment-shared/models";
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

  const touchedAnyFields = !!Object.entries(form.touched).length

  console.log(touchedAnyFields, form.errors.guestsCount, !!(touchedAnyFields && form.errors.guestsCount))

  return (
    <FormikContext.Provider value={form}>
      <Form onReset={form.handleReset} onSubmit={form.handleSubmit} className={clsx(styles.root, props.className)}>
        <KeyboardDatePicker
          error={!!(touchedAnyFields && form.errors.startDate)}
          className={styles.spacing}
          label='Start date'
          value={form.values.startDate}
          onBlur={() => form.setFieldTouched('startDate')}
          onChange={date => {
            form.setFieldTouched('startDate')
            form.setFieldValue('startDate', date)
          }}
          maxDate={form.values.endDate}
        />
        <KeyboardDatePicker
          error={!!(touchedAnyFields && form.errors.endDate)}
          className={styles.spacing}
          label="End date"
          value={form.values.endDate}
          onBlur={() => form.setFieldTouched('endDate')}
          onChange={date => {
            form.setFieldTouched('endDate')
            form.setFieldValue('endDate', date)
          }}
          minDate={form.values.startDate}
        />
        <TextField
          error={!!(touchedAnyFields && form.errors.guestsCount)}
          className={clsx(styles.spacing, styles.guestsInput)}
          label='Guests'
          type='number'
          value={form.values.guestsCount}
          onBlur={() => form.setFieldTouched('guestsCount')}
          onChange={e => form.setFieldValue('guestsCount', e.target.value)}
          inputProps={{ min: 1 }}
        />
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