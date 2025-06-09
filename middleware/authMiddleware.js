const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ msg: 'You need to be logged in to use this page'})
  }
}

module.exports = {
  isAuth
}