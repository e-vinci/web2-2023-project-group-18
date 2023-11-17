const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: 5, // elephantsql contraite
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000, /* Si le serveur est pas assez rapide peux faire bugger l' app
    */
});
pool.on('error', (err) => {
    console.log(err);
    // console.error('Unexpected error on idle client', err);
    process.exit(-1); // SI une erreur dans la pool -> exit
});

async function queryExecute(query) {
    try {
        const client = await pool.connect();
        try {
            const result = await client.query(query);
            // console.log(`Result: ${result}`);
            return result;
        } catch (error) {
            console.log(error);
            // console.error('Error executing query:', error);
            throw error;
        } finally {
            client.release();
        }
    } catch (error) {
        end();
        console.error('Error client connect:', error);
        throw error;
    }
}

function end() {
    pool.end();
}

module.exports = { queryExecute, end };
