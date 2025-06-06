const { pool } = require("../../config/pool");

const addUserToDb = async (firstName, lastName, username, password, admin = false) => {
  await pool.query(
    "INSERT INTO users(first_name, last_name, username, password, admin) VALUES ($1, $2, $3, $4, $5)",
    [firstName, lastName, username, password, admin],
  );
};

const findUserByEmail = async (username) => {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  return result.rows;
};

module.exports = { addUserToDb, findUserByEmail };
