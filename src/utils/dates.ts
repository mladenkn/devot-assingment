import { isAfter, isBefore, isSameDay, addDays } from "date-fns";

export function isInRange(date: Date, range: [Date, Date]){
  return (isAfter(date, range[0]) || isSameDay(date, range[0])) && isBefore(date, range[1])
}

export function doOverlap(range1: [Date, Date], range2: [Date, Date]){
  const range2Plus: [Date, Date] = [range2[0], addDays(range2[1], 1)]
  return isInRange(range1[0], range2Plus) || isInRange(range1[1], range2Plus)
}