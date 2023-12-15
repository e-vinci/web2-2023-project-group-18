const { Pool } = require('pg');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/database.sql');

// Create Pool
let pool;
if (process.env.DB_USER
  && process.env.DB_HOST
  && process.env.DB_DATABASE
  && process.env.DB_PASSWORD) {
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: 5, // elephantsql contraite
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
} else {
  console.error('Your database credentials are not correct!');
  process.exit(1);
}

async function queryExecute(query) {
  let client;
  try {
    // connect client to pool
    client = await pool.connect();
    // execute query request
    return await client.query(query);
  } finally {
    client.release();
  }
}

// creat db if nost exist
const dbInit = fs.readFileSync(filePath).toString();
queryExecute(dbInit);

module.exports = { queryExecute };
