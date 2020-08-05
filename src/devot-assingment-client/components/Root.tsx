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
          <Route path='/'>
            <Redirect to='//hosts/search'/>
          </Route>
          <Route path='/hosts/search'>
            <HostsList />
          </Route>
        </Switch>
      </BrowserRouter>
    </MuiPickersUtilsProvider>
  )
}