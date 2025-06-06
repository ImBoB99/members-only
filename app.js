const express = require("express");
require("dotenv").config();
const { pool } = require("./config/pool");
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const userRouter = require("./routes/userRouter");
const { notFoundHandler, globalErrorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/", userRouter);

app.use(notFoundHandler);
app.use(globalErrorHandler);

const PORT = process.env.APP_PORT;
app.listen(PORT, async () => {
  console.log(`Server is running on port: ${PORT}`);

  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Connected to the database", res.rows[0]);
  } catch (error) {
    console.log(error);
  }
});
