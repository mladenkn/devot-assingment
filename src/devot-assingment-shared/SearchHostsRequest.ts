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

// export function serialize(r: SearchHostsRequest){
//   return {
//     startDate: format(r.startDate, 'yyyy-MM-dd'),
//     endDate: format(r.startDate, 'yyyy-MM-dd'),
//     guests: r.guests
//   }
// }

export function deserialize(serialized: any){
  return {
    startDate: new Date(serialized.startDate),
    endDate: new Date(serialized.endDate),
    guests: parseInt(serialized.guests)
  }
}