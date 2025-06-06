const { Router } = require('express');
const userRouter = Router();
const userController = require('../controllers/userController')

userRouter.get("/signup", userController.getSignup);
userRouter.post("/signup", userController.postSignup);

module.exports = userRouter;