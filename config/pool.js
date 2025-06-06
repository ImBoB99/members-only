const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool ({
  user: process.env.DB_USER,
  password: process.env.DB_USER_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE_NAME,
})

module.exports = {pool};