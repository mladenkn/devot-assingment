import { AppDataFilesPaths, Booking, Room, Host } from "./models"
import csv from 'csvtojson'
import { camelCase } from "lodash"

export default async function(files: AppDataFilesPaths){

  const promises = {
    bookings: loadSet(files.bookings),
    hosts: loadSet(files.hosts),
    rooms: loadSet(files.rooms)
  }

  await Promise.all(Object.values(promises))

  return {
    bookings: (await promises.bookings)
      .map(b => ({
        ...b,
        startDate: new Date(b.startDate),
        endDate: new Date(b.endDate),
        numberOfGuests: parseInt(b.numberOfGuests)
      }) as Booking),
    
    hosts: (await promises.hosts) as Host[],
    
    rooms: (await promises.rooms)
      .map(r => ({
        ...r,
        capacity: parseInt(r.capacity)
      }))
  }
}

async function loadSet(name: string){
  return new Promise<any[]>(resolve => {
    csv().fromFile(name)
      .then(data => {
        const mapped = data.map(item => {
          const newEntries = Object.entries(item)
            .map(([key, value]) => [camelCase(key), value])
          return Object.fromEntries(newEntries)
        })
        resolve(mapped)
      })
  })
}