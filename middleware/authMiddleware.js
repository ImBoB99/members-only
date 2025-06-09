const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ msg: "You need to be logged in to use this page" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin) {
    next();
  } else {
    res.status(401).json({ msg: "You need to be an admin" });
  }
};

module.exports = {
  isAuth,
  isAdmin,
};
