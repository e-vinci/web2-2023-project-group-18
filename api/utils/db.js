const { Pool } = require('pg');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { CLIENT_RENEG_LIMIT } = require('tls');

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

async function queryExecute(query, values) {
  let client;
  try {
    // connect client to pool
    client = await pool.connect();
    // execute query request
    if (values === undefined) return await client.query(query);
    console.log(JSON.stringify(values));
    for (let i = 0; i < values.length; i += 1) {
      const element = values[i];
      console.log(typeof element);
    }
    return await client.query(query, values);
  } finally {
    client.release();
  }
}

// creat db if nost exist
const dbInit = fs.readFileSync(filePath).toString();
queryExecute(dbInit);

module.exports = { queryExecute };
