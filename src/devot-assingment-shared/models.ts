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