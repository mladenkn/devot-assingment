export type SearchHostsFormInput = {
  startDate: Date
  endDate: Date
  guestsCount: number
  offset: number
}

export type SearchHostsFormInputUncomplete = {
  startDate: Date | null,
  endDate: Date | null,
  guestsCount?: number
  offset: 0
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