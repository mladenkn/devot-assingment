import { format, parse } from "date-fns"

export type SearchHostsRequest = {
  startDate: Date
  endDate: Date
  guests: number
}

export type SearchHostsRequestUncomplete = {
  startDate: Date | null,
  endDate: Date | null,
  guests?: number
}

export function serialize(r: SearchHostsRequest){
  return {
    startDate: format(r.startDate, 'yyyy-MM-dd'),
    endDate: format(r.startDate, 'yyyy-MM-dd'),
    guests: r.guests
  }
}

export function deserialize(serialized: any){
  return {
    startDate: parse(serialized.startDate, 'yyyy-MM-dd', 0),
    endDate: parse(serialized.startDate, 'yyyy-MM-dd', 0),
    guests: parseInt(serialized.guests)
  }
}