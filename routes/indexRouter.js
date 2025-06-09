const { Router } = require('express');
const {getRoot, deleteMessage} = require('../controllers/indexController')
const { isAdmin } = require("../middleware/authMiddleware");

const indexRouter = Router();

indexRouter.get("/", getRoot);
indexRouter.post("/delete-message", isAdmin, deleteMessage)

module.exports =  indexRouter;