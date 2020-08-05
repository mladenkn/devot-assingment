export type AppDataFilesPaths = {
  bookings: string
  hosts: string
  rooms: string
}

export type AppData = {
  bookings: Booking[]
  hosts: Host[]
  rooms: Room[]
}

export type Host = {
  ref: string
  name: string
  address: string
}

export type Room = {
  ref: string
  hostRef: string
  capacity: number
}

export type Booking = {
  ref: string
  roomRef: string
  startDate: Date
  endDate: Date
  numberOfGuests: number
}