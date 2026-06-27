const { body } = require("express-validator");

const registerValidator = [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email"),

  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

const loginValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email"),

  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];



module.exports = {
  registerValidator,
  loginValidator,
};