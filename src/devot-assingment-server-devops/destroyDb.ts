import { destroySchema, connectToDb } from '../devot-assingment-server/dbInit'

destroySchema(connectToDb())
  .then(() => {
    console.log('Succesfully destroyed db schema.')
    process.exit()
  })
  .catch(e => {
    console.error(e)
    process.exit(1)
  })