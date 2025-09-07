const { Pool } = require('pg')

require('dotenv').config();
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: 20, // Optional: connection pool size
    idleTimeoutMillis: 30000, // Optional: idle client timeout
})

pool.on('connect', () => {
    console.log('Database connected Successfully');
});

pool.on('error', (err) => {
    console.log('Unable to connect with Database',err);
    process.exit(-1)

})

module.exports = {
    query: (text, params) => pool.query(text, params),
};