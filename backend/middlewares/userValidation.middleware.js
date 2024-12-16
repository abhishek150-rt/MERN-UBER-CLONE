const { body } = require("express-validator");

const validateRegister = [
  body("email").isEmail().withMessage("Invalid Email"),
  body("fullName.firstName")
    .isLength({ min: 3 })
    .withMessage("First name should be at least 3 characters long"),
  body("password")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/)
    .withMessage(
      "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long."
    ),
];

const validateLogin = [
  body("email").isEmail().withMessage("Invalid Email address"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long"),
];

module.exports = { validateRegister, validateLogin };
