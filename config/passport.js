const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("./pool");
const bcrypt = require("bcrypt");

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const {rows} = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = rows[0];

    if (!user) {
      return done(null, false, {message: "Incorrect username"})
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return done(null, false, {message: "incorrect password"})
    }

    return done(null, user)
  } catch (error) {
    return done(error)
  }
}))

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    let user = rows[0];

    // remove user.password from the user session object
    delete user.password;
    done(null, user);
  } catch(err) {
    done(err);
  }
});