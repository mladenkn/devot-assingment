import path from 'path'
import loadAppData from '../devot-assingment-server/loadAppData'
import { connectToDb } from '../devot-assingment-server/db'
import { Host } from '../devot-assingment-server/models'

function getDataFilesPaths(){
  // TODO: softcode path!
  const folder = 'C:\\Users\\mlade\\Documents\\projekti\\devot-assingment\\test_data'
  const sufix = '-2000.csv'
  return {
    bookings: path.join(folder, 'bookings' + sufix),
    hosts: path.join(folder, 'hosts' + sufix),
    rooms: path.join(folder, 'rooms' + sufix),
  }
}

loadAppData(getDataFilesPaths())
  .then(async data => {
    const db = connectToDb()
    await db.table<Host>('hosts').insert(data.hosts)
    await db.table<Host>('rooms').insert(data.rooms)
    await db.table<Host>('bookings').insert(data.bookings)
  })
  .then(() => {
    console.log('Successfully seeded the database\n')
    process.exit(0)
  })
  .catch(e => {
    console.error(e)
    process.exit(1)
  })