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

export function deserialize(serialized: any){
  return {
    startDate: new Date(serialized.startDate),
    endDate: new Date(serialized.endDate),
    guests: parseInt(serialized.guests)
  }
}