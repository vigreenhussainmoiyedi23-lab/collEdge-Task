const { body } = require("express-validator");

const messageValidator = [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email"),

  body("message")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Message must be at least 5 characters"),
];

module.exports = {
  
  messageValidator,
};