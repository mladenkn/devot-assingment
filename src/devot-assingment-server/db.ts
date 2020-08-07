import initKnex from 'knex'

export function connectToDb(){
  return initKnex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: '',
      database: 'devot-assingment'
    }
  });
}

export type Database = ReturnType<typeof connectToDb>

export async function createSchema(db: Database){
  await db.schema.createTable('hosts', t => {
    t.string('ref').primary()
    t.string('name')
    t.string('address')
  })

  await db.schema.createTable('rooms', t => {
    t.string('ref').primary()
    t.string('hostRef')
    t.integer('capacity')
    
    t.foreign('hostRef').references('ref').inTable('hosts')
  })

  await db.schema.createTable('bookings', t => {
    t.string('ref').primary()
    t.string('roomRef')
    t.date('startDate')
    t.date('endDate')
    t.integer('numberOfGuests')
    
    t.foreign('roomRef').references('ref').inTable('rooms')
  })
}

export async function destroySchema(db: Database){
  await db.schema.dropTable('rooms')
  await db.schema.dropTable('hosts')
  await db.schema.dropTable('bookings')
}