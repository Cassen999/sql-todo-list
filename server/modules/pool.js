const pg = require('pg');

// get the Pool object from pg
const Pool = pg.Pool;

// Make our own instance of a Pool from that template Pool object
const pool = new Pool({
    database: 'weekend-to-do-app', // Add in database name
    host: 'localhost', // connect to our local computer
    port: 5432, // port number, this is the default
    max: 10, // max number of connections
    idleTimeoutMillis: 30000 // 30 sec
})

// When we connect to the database, fun a function
pool.on('connect', () => {
    console.log(`Connected to database...`);
})

pool.on('ERROR', (error) => {
    console.log('Error from pg', error);
})

module.exports = pool;