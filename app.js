const express = require("express");
require('dotenv').config();
const { pool } = require("./db/pool")
const path = require("node:path");
const indexRouter = require('./routes/indexRouter')

const app = express();

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs')

app.use('/', indexRouter)

const PORT = process.env.APP_PORT;
app.listen(PORT, async () => {
  console.log(`Server is running on port: ${PORT}`);

  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Connected to the database", res.rows[0])
  } catch (error) {
    console.log(error)
  }
});
