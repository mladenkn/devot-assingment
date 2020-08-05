import React from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { HostsList } from "./HostsList";
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

export function Root(){
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/hosts/search'/>
          </Route>
          <Route exact path='/hosts/search'>
            {() => {
              const formValues = {
                startDate: new Date('2013-06-01'),
                endDate: new Date('2013-06-07'),
                guestsCount: undefined
              }
              return <HostsList formInitialValues={formValues} />
            }}
          </Route>
        </Switch>
      </BrowserRouter>
    </MuiPickersUtilsProvider>
  )
}