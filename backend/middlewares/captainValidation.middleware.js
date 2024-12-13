const { body } = require("express-validator");

const validateRegister = [
  body("email").isEmail().withMessage("Invalid email format"),

  body("fullName.firstName")
    .isLength({ min: 3 })
    .withMessage("First name should be at least 3 characters long"),

  body("fullName.lastName")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Last name should be at least 3 characters long"),

  body("password")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/)
    .withMessage(
      "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long."
    ),
  body("vehicle.color")
    .isLength({ min: 3 })
    .withMessage("Vehicle color should be at least 3 characters long"),

  body("vehicle.capacity")
    .isInt({ min: 1 })
    .withMessage(
      "Vehicle capacity should be a positive integer greater than or equal to 1"
    ),

  body("vehicle.plate")
    .isLength({ min: 3 })
    .withMessage("Vehicle plate should be at least 3 characters long"),

  body("vehicle.vehicleType")
    .isIn(["car", "bike", "auto"])
    .withMessage(
      "Invalid vehicle type. Vehicle type should be car, bike, or auto"
    ),
];

const validateLogin = [
  body("email").isEmail().withMessage("Invalid email format"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long"),
];

module.exports = { validateRegister, validateLogin };
