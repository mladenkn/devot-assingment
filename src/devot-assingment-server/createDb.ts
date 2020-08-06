import initKnex from 'knex'

export default function(){
  const db = initKnex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: '',
      database: 'devot-assingment'
    }
  });
  
}