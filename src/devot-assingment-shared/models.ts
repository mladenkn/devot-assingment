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

export type HostListItem = {
  ref: string
  name: string
  address: string
  rooms: HostListRoom[]
}

export type HostListRoom = {
  ref: string
  name: string
  totalCapacity: number
  freeCapacity: number
}