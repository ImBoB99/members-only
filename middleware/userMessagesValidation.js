const { body } = require("express-validator");

const validateMessageTitle = [body("title").trim().notEmpty().withMessage("Title is required.")];

const validateMessageText = [
  body("text").trim().notEmpty().withMessage("Message text is required."),
];

const messageValidations = [validateMessageTitle, validateMessageText]

module.exports = {
  messageValidations
}