import express from 'express'
import cors from 'cors'
import { registerRoutes } from './routes'

const app = express()
const port = 3001

app.use(cors())

registerRoutes(app)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})