// test-db.js (Run with: node test-db.js)
const { Pool } = require('pg');
require('dotenv').config({ path: './.env.local' }); // Make sure to load your env vars

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 15000,
});

pool.connect()
    .then(client => {
        console.log('✅ Success! Raw PG connection established.');
        return client.query('SELECT NOW()');
    })
    .then(res => {
        console.log('Query Result:', res.rows[0]);
        pool.end();
    })
    .catch(err => {
        console.error('❌ Connection Failed:', err.message);
        pool.end();
    });