const db = require("../db/queries/userQueries");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
require('dotenv').config();

const getSignup = (req, res) => {
  res.render("signup");
};

const getLogin = (req, res) => {
  res.render("login");
};

const getJoinTheClub = (req, res) => {
  res.render("join-the-club");
};

const postSignup = async (req, res) => {
  console.log("User posting signup");


  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Handle errors - send back to client or re-render view
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password } = req.body;
  const isAdmin = req.body.admin === "true" ? true : false;

  try {
    const hashedPasword = await bcrypt.hash(password, 10)
    await db.addUserToDb(firstName, lastName, email, hashedPasword, isAdmin);
  } catch (error) {
    console.error(error);
  }
  res.redirect("/signup");
};

const postJoinTheClub = async (req, res, next) => {
  const { clubSecret } = req.body;
  const userId = req.user.id;

  if (clubSecret !== process.env.CLUB_SECRET) {
    
    return res.status(403).send("Invalid club secret");
  }

  try {
    await db.addUserToClub(userId);
    return res.redirect("/");
  } catch (err) {
    
    console.error("DB error in addUserToClub:", err);
    return next(err);
  }
};


module.exports = { getSignup, postSignup, getLogin, getJoinTheClub, postJoinTheClub };
