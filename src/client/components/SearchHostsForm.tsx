import React from "react"
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { GetHostsRequest } from "../../shared";

export type Props = {
  value: GetHostsRequest
}

export function SearchHostsForm(props: Props){
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        // disableToolbar
        // variant="inline"
        // format="MM/dd/yyyy"
        // margin="normal"
        // label="Date picker inline"
        value={new Date()}
        onChange={() => {}}
      />
    </MuiPickersUtilsProvider>
  )
} 