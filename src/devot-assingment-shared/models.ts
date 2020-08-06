export type SearchHostsFormInput = {
  startDate: Date
  endDate: Date
  guestsCount: number
}

export type SearchHostsFormInputUncomplete = {
  startDate: Date | null,
  endDate: Date | null,
  guestsCount?: number
}

export type PaginationParams = {
  offset: number
  maxCount: number
}

export type SearchHostsRequest = PaginationParams & SearchHostsFormInput

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