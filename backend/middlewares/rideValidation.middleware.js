const { body } = require("express-validator");

const validateRide = [
  body("userId")
    // .isString()
    .isLength({ min: 24, max: 24 })
    .withMessage("Provide valid user id"),
  body("pickup")
    // .isString()
    .isLength({ min: 3 })
    .withMessage("Provide pickup location"),
  body("destination")
    // .isString()
    .isLength({ min: 3 })
    .withMessage("Provide destination location"),
  body("vehicleType")
    // .isString()
    .isIn(["car", "auto", "bike"])
    .withMessage("Provide valid vehicle type"),
];

module.exports = validateRide;
