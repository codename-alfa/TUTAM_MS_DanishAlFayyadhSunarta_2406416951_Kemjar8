require("dotenv").config();

const { Pool: PgPool } = require('pg');
const { Pool: NeonPool, neon } = require('@neondatabase/serverless');

let pool;
let sql;

if (process.env.NODE_ENV === 'production') {
  console.log("Running in production, using Neon serverless driver.");
  pool = new NeonPool({ connectionString: process.env.DATABASE_URL });
  sql = neon(process.env.DATABASE_URL);
} else {
  console.log("✅ Running locally, using standard `pg` driver.");
  pool = new PgPool({ connectionString: process.env.DATABASE_URL });
  sql = null; 
}

(async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT version()');
    console.log("✅ Connected to database!");
    console.log("PostgreSQL version:", result.rows[0].version);
    client.release();
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
})();

module.exports = { pool, sql };