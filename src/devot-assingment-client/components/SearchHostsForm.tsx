import React from "react"
import { KeyboardDatePicker } from '@material-ui/pickers';
import { SearchHostsFormInput, SearchHostsFormInputUncomplete } from "../../devot-assingment-shared/models";
import { makeStyles, TextField } from "@material-ui/core";
import { FormikProps, Form, FormikContext } from "formik";
import clsx from 'clsx'

export type Props = {
  className?: string
  form: FormikProps<SearchHostsFormInput | SearchHostsFormInputUncomplete>
}

export function SearchHostsForm(props: Props){

  const styles = useStyles()
  const { form } = props

  const touchedAnyFields = !!Object.entries(form.touched).length

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
          minDate={new Date()}
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
          className={clsx(styles.guestsInput)}
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