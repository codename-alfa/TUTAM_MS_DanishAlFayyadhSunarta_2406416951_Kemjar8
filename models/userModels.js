const sql = require("../db");
const { pool } = require('../db');

exports.findAll = async () => {
  return await sql`SELECT id, name, username, email FROM users`;
};

exports.findById = async (id) => {
  const result = await sql`SELECT id, name, username, email FROM users WHERE id = ${id}`;
  return result[0];
};

exports.create = async ({ name, username, email, password }) => {
  const result = await sql`
    INSERT INTO users (name, username, email, password)
    VALUES (${name}, ${username}, ${email}, ${password})
    RETURNING id, name, username, email;
  `;
  return result[0];
};

exports.update = async (id, { name, username, email, password }) => {
  const result = await sql`
    UPDATE users
    SET name = ${name}, username = ${username}, email = ${email}, password = ${password}
    WHERE id = ${id}
    RETURNING id, name, username, email;
  `;
  return result[0];
};

exports.remove = async (id) => {
  await sql`DELETE FROM users WHERE id = ${id}`;
};

exports.findByCredentials = async (username, password) => {
  const result = await sql`
    SELECT id, name, username, email FROM users
    WHERE username = ${username} AND password = ${password}
  `;
  return result[0];
};


exports.findVulnerable = async (username, password) => {
  const query = `
    SELECT id, name, username, email FROM users
    WHERE username = '${username}' AND password = '${password}'
  `;  
  try {
    const result = await pool.query(query);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows;
  } catch (err) {
    console.error("Query execution failed:", err.message);
    throw err;
  }
};

exports.findPasswordByCredentials = async (username, password) => {
  const query = `
    SELECT username, password FROM users
    WHERE username = '${username}' AND password = '${password}'
  `;
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error("Query execution failed:", err.message);
    throw err;
  }
};