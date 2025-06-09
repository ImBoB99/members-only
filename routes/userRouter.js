const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");
const { signupValidation } = require("../middleware/userSignupValidation");
const passport = require("passport")

userRouter.get("/signup", userController.getSignup);
userRouter.post("/signup", signupValidation, userController.postSignup);
userRouter.get("/login", userController.getLogin);
userRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/login",
  }),
);
userRouter.post("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error)
    }

    res.redirect("/login")
  })
})

userRouter.get("/join-the-club", userController.getJoinTheClub);
userRouter.post("/join-the-club", userController.postJoinTheClub);

module.exports = userRouter;
