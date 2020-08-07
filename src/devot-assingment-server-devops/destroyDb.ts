import { dropTables, connectToDb } from '../devot-assingment-server/db'

dropTables(connectToDb())
  .then(() => {
    console.log('Succesfully destroyed db schema.')
    process.exit()
  })
  .catch(e => {
    console.error(e)
    process.exit(1)
  })