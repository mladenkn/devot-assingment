import React from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { HomeSection } from "./HomeSection";

export function Root(){
  return (    
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <HomeSection />
    </MuiPickersUtilsProvider>
  )
}