const { Router } = require('express');
const userRouter = Router();
const userController = require('../controllers/userController')
const {signupValidation} = require('../middleware/userSignupValidation')

userRouter.get("/signup", userController.getSignup);
userRouter.post("/signup", signupValidation, userController.postSignup);

module.exports = userRouter;