import { AppDataFilesPaths, Booking, Room, Host } from "./models"
import csv from 'csvtojson'
import { camelCase } from "lodash"
import { parse } from "date-fns"

export default async function(files: AppDataFilesPaths){
  const bookings = (await loadSet(files.bookings))
    .map(b => ({
      ...b,
      startDate: parse(b.startDate, 'yyyy-MM-dd', 0),
      endDate: parse(b.startDate, 'yyyy-MM-dd', 0),
      capacity: parseInt(b.capacity)
    }) as Booking)

  const hosts = (await loadSet(files.hosts)) as Host[]
  
  const rooms = (await loadSet(files.rooms))
    .map(r  => ({
      ...r,
      capacity: parseInt(r.capacity)
    }) as Room)

  return { bookings, rooms, hosts }
}

async function loadSet(name: string){
  const set = await csv().fromFile(name)
  return set.map(item => {
    const newEntries = Object.entries(item)
      .map(([key, value]) => [camelCase(key), value])
    return Object.fromEntries(newEntries)
  })
}