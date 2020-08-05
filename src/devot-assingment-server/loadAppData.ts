import { AppDataFilesPaths, Booking, Room, Host } from "./models"
import csv from 'csvtojson'
import { camelCase } from "lodash"
import { parse } from "date-fns"

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
        startDate: parse(b.startDate, 'yyyy-MM-dd', 0),
        endDate: parse(b.startDate, 'yyyy-MM-dd', 0),
        capacity: parseInt(b.capacity)
      }) as Booking),
    
    hosts: (await promises.rooms) as Host[], 
    
    rooms: (await promises.bookings)
      .map(r  => ({
        ...r,
        capacity: parseInt(r.capacity)
      }) as Room)
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