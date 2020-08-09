import { Host, Room, Booking } from '../devot-assingment-server/models'
import { connectToDb } from '../devot-assingment-server/db'

const hosts: Host[] = [
  {
    ref: 'host#1',
    address: 'Adresa host#1',
    name: 'Ime hosta host#1'
  },
  {
    ref: 'host#2',
    address: 'Adresa host#2',
    name: 'Ime hosta host#2'
  },
  {
    ref: 'host#3',
    address: 'Adresa host#3',
    name: 'Ime hosta host#3'
  },
]

const rooms: Room[] = [
  {
    ref: 'room#1',
    hostRef: 'host#1',
    capacity: 1
  },
  {
    ref: 'room#2',
    hostRef: 'host#1',
    capacity: 2
  },
  
  {
    ref: 'room#3',
    hostRef: 'host#2',
    capacity: 3
  },
  {
    ref: 'room#4',
    hostRef: 'host#2',
    capacity: 3
  },

  {
    ref: 'room#5',
    hostRef: 'host#3',
    capacity: 2
  }
]

const bookings: Booking[] = [
  {
    ref: 'booking#1',
    roomRef: 'room#1',
    startDate: new Date('2020-09-01'),
    endDate: new Date('2020-09-10'),
    numberOfGuests: 1
  },
  {
    ref: 'booking#2',
    roomRef: 'room#1',
    startDate: new Date('2020-09-12'),
    endDate: new Date('2020-09-15'),
    numberOfGuests: 1
  },

  {
    ref: 'booking#3',
    roomRef: 'room#2',
    startDate: new Date('2020-09-01'),
    endDate: new Date('2020-09-10'),
    numberOfGuests: 1
  },
  
  {
    ref: 'booking#4',
    roomRef: 'room#3',
    startDate: new Date('2020-09-01'),
    endDate: new Date('2020-09-10'),
    numberOfGuests: 3
  },
]

const db = connectToDb()
db.table('hosts').insert(hosts)
  .then(() => db.table('rooms').insert(rooms))
  .then(() => db.table('bookings').insert(bookings))
  .then(() => {
    console.log('Successfully seeded the database')
    process.exit()
  })
