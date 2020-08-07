import express from 'express'
import cors from 'cors'
import HostsRepository from './HostsRepository'
import { registerRoutes } from './routes'
import { connectToDb } from './db'

const app = express()
const port = 3001
app.use(cors())

const hostsRepo = new HostsRepository(connectToDb())
registerRoutes(app, hostsRepo)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})