const { pool } = require("../db");

exports.findAll = async () => {
  const result = await pool.query("SELECT id, name, username, email FROM users");
  return result.rows;
};

exports.findById = async (id) => {
  const result = await pool.query(
    "SELECT id, name, username, email FROM users WHERE id = $1 LIMIT 1",
    [id]
  );
  return result.rows[0] || null;
};

exports.create = async ({ name, username, email, password }) => {
  const result = await pool.query(
    `INSERT INTO users (name, username, email, password)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, username, email`,
    [name, username, email, password]
  );
  return result.rows[0];
};

exports.update = async (id, { name, username, email, password }) => {
  const result = await pool.query(
    `UPDATE users
     SET name = $1, username = $2, email = $3, password = $4
     WHERE id = $5
     RETURNING id, name, username, email`,
    [name, username, email, password, id]
  );
  return result.rows[0] || null;
};

exports.remove = async (id) => {
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
};

exports.findByCredentials = async (username, password) => {
  const result = await pool.query(
    `SELECT id, name, username, email FROM users
     WHERE username = $1 AND password = $2
     LIMIT 1`,
    [username, password]
  );
  return result.rows[0] || null;
};

exports.findVulnerable = async (username, password) => {
  const query = `
    SELECT id, name, username, email FROM users
    WHERE username = $1 AND password = $2
    LIMIT 1
  `;
  const result = await pool.query(query, [username, password]);
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows;
};

exports.findPasswordByCredentials = async (username, password) => {
  const query = `
    SELECT id, username FROM users
    WHERE username = $1 AND password = $2
    LIMIT 1
  `;
  const result = await pool.query(query, [username, password]);
  return result.rows;
};
