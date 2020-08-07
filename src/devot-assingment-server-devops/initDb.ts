import { createSchema, connectToDb } from '../devot-assingment-server/dbInit'

createSchema(connectToDb())
  .then(() => {
    console.log('Succesfully initialized the database.')
    process.exit()
  })
  .catch(e => {
    console.error(e)
    process.exit(1)
  })