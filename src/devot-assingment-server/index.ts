import express from 'express'
import cors from 'cors'
import path from 'path'
import loadAppData from './loadAppData'
import HostsInMemoryRepository from './HostsInMemoryRepository'
import { registerRoutes } from './routes'

function getDataFilesPaths(){
  // TODO: softcode path!
  const folder = 'C:\\Users\\mlade\\Documents\\projekti\\devot-assingment\\assingment_specs'
  const sufix = '-2000.csv'
  return {
    bookings: path.join(folder, 'bookings' + sufix),
    hosts: path.join(folder, 'hosts' + sufix),
    rooms: path.join(folder, 'rooms' + sufix),
  }
}

const app = express()
const port = 3001

app.use(cors())

loadAppData(getDataFilesPaths())
  .then(appData => {
    const hostsRepo = new HostsInMemoryRepository(appData)
    registerRoutes(app, hostsRepo)
  })

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})