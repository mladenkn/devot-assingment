import { AppDataFilesPaths } from "./models"
import csv from 'csvtojson'
import { camelCase } from "lodash"

export default async function(files: AppDataFilesPaths){
  const bookings = await loadSet(files.bookings)
  const hosts = await loadSet(files.hosts)
  const rooms = await loadSet(files.rooms)

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