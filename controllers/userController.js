const getSignup = (req, res) => {
  res.render("signup");
}

const postSignup = (req, res) => {
  console.log("User posting signup")
  console.log(req.body)
  res.redirect("/signup")
}

module.exports = { getSignup, postSignup }