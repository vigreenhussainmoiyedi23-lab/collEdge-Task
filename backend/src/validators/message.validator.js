const { body } = require("express-validator");
const validate = require("./validate");

const taskValidator = [
  body("title")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),

  body("description")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Description must be at least 5 characters"),

  body("priority")
    .trim()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be one of: low, medium, high"),
  validate
];

module.exports = {

  taskValidator,
};