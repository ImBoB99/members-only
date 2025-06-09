const { body } = require("express-validator");
const { alphaErr, lengthErr, emailErr } = require("../helpers/errorValidationMessages");
const { findUserByEmail } = require("../db/queries/userQueries");

const validateFirstName = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required.")
    .isAlpha("en-US")
    .withMessage(alphaErr)
    .isLength({ min: 2, max: 50 })
    .withMessage(lengthErr),
];

const validateLastName = [
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required.")
    .isAlpha("en-US")
    .withMessage(alphaErr)
    .isLength({ min: 2, max: 50 })
    .withMessage(lengthErr),
];

const validateUsername = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Username (email) is required.")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)
    .withMessage(emailErr)
    .custom(async (value) => {
      const existingUser = await findUserByEmail(value);
      // db sends an array with an obj if it finds a user
      if (existingUser.length > 0) {
        throw new Error("A user with this e-mail already exists.");
      }

      return true;
    }),
];

const validatePassword = [
  body("password").trim().notEmpty().withMessage("Password is required."),
  // can enforce additional password constraints
];

const validateConfirmPassword = [
  body("confirmPassword").custom((value, { req }) => {

    const passwordsMatch = value === req.body.password;
    if (!passwordsMatch) {
      throw new Error("Passwords do not match")
    }

    return true;
  }),
];

const signupValidation = [
  ...validateFirstName,
  ...validateLastName,
  ...validateUsername,
  ...validatePassword,
  ...validateConfirmPassword
];

module.exports = {
  signupValidation,
  // or export individual ones if needed too
};
