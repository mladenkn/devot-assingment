export type SearchHostsRequest = {
  startDate: Date
  endDate: Date
  guestsCount: number
}

export type SearchHostsRequestUncomplete = {
  startDate: Date | null,
  endDate: Date | null,
  guestsCount?: number
}

export function deserialize(serialized: any): SearchHostsRequest{
  return {
    startDate: new Date(serialized.startDate),
    endDate: new Date(serialized.endDate),
    guestsCount: parseInt(serialized.guestsCount)
  }
}