const express = require("express");
require("dotenv").config();
const { pool } = require("./config/pool");
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const userRouter = require("./routes/userRouter");
const { notFoundHandler, globalErrorHandler } = require("./middleware/errorHandler");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("passport");

// Need to require the entire Passport config module so app.js knows about it
require("./config/passport");

const app = express();

app.use(
  session({
    store: new pgSession({
      pool: pool,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);
app.use(passport.session());

// globally set the currentUser variable so every ejs view has access
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use;

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
