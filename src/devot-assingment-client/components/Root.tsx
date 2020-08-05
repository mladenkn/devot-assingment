import React from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { HostsListSection } from "./HostsListSection";
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

export function Root(){
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>            
            <Redirect to={'/hosts/search?start_date=2013-06-01&end_date=2013-06-07&guests=1'} />
          </Route>
          <Route exact path='/hosts/search'>
            {() => {
              const params = (new URL((document as any).location)).searchParams
              const formValues = {
                startDate: new Date(params.get('start_date') as string),
                endDate: new Date(params.get('end_date') as string),
                guestsCount: parseInt(params.get('guests') as string)
              }
              return <HostsListSection formInitialValues={formValues} />
            }}
          </Route>
        </Switch>
      </BrowserRouter>
    </MuiPickersUtilsProvider>
  )
}