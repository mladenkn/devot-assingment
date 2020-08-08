import initKnex from 'knex'
const dbConf = require('../../db.conf')

export function connectToDb(){
  return initKnex(dbConf);
}

export type Database = ReturnType<typeof connectToDb>

export async function createTables(db: Database){
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

export async function dropTables(db: Database){
  await db.schema.dropTable('bookings')
  await db.schema.dropTable('rooms')
  await db.schema.dropTable('hosts')
}