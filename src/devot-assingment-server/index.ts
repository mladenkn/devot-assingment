import express from 'express'
import cors from 'cors'
import { registerRoutes } from './routes'
import { HostsRepository } from './HostsRepository'
import path from 'path'

function getDataFilesPaths(){
  const folder = 'C:\\Users\\mlade\\Documents\\projekti\\devot-assingment\\assingment_specs'
  const sufix = '-2000.csv'
  return {
    bookings: path.join(folder, 'bookings' + sufix),
    hosts: path.join(folder, 'bookings' + sufix),
    rooms: path.join(folder, 'bookings' + sufix),
  }
}

const app = express()
const port = 3001

app.use(cors())

const hostsRepo = new HostsRepository()
hostsRepo.initialize(getDataFilesPaths())
  .then(() => {
    registerRoutes(app, hostsRepo)
  })

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})