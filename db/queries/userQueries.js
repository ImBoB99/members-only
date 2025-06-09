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

const addUserToClub = async (userId) => {
  await pool.query("UPDATE users SET membership_status = true WHERE id = $1", [userId])
}

const postUserMessage = async (title, text, userId) => {
  await pool.query("INSERT INTO posts (title, text, user_id) VALUES ($1, $2, $3)", [title, text, userId])
}

const getAllMessages = async () => {
  const {rows} = await pool.query("SELECT title, created_on, text, user_id, username FROM posts INNER JOIN users ON posts.user_id = users.id");
  return rows;
}

module.exports = { addUserToDb, findUserByEmail, addUserToClub, postUserMessage, getAllMessages };
