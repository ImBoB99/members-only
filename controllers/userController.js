const db = require("../db/queries/userQueries");

const getSignup = (req, res) => {
  res.render("signup");
};

const postSignup = async (req, res) => {
  console.log("User posting signup");
  console.log(req.body);
  const { firstName, lastName, email, password } = req.body;
  const isAdmin = req.body.admin === 'true' ? true : false;

  try {
    await db.addUserToDb(firstName, lastName, email, password, isAdmin);
  } catch (error) {
    console.error(error);
  }
  res.redirect("/signup");
};

module.exports = { getSignup, postSignup };
