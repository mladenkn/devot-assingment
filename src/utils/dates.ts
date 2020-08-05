import { isAfter, isBefore } from "date-fns";

export function isInRange(date: Date, range: [Date, Date]){
  return isAfter(date, range[0]) && isBefore(date, range[1])
}

export function doOverlap(range1: [Date, Date], range2: [Date, Date]){
  return isInRange(range1[0], range2) || isInRange(range1[1], range2)
}