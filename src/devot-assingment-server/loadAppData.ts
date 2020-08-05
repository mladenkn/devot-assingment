import { AppDataFilesPaths } from "./models"
import csv from 'csvtojson'

export default async function(files: AppDataFilesPaths){
    const bookings = await csv().fromFile(files.bookings)
    const hosts = await csv().fromFile(files.hosts)
    const rooms = await csv().fromFile(files.rooms)

    return { bookings, rooms, hosts }
  } 