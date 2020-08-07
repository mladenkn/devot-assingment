import { createTables, connectToDb } from '../devot-assingment-server/db'

createTables(connectToDb())
  .then(() => {
    console.log('Succesfully initialized the database.')
    process.exit()
  })
  .catch(e => {
    console.error(e)
    process.exit(1)
  })