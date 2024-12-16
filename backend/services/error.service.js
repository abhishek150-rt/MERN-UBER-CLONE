const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  console.log("errors",errors)
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array().map((val) => val.msg) });
  }
};
module.exports = { handleValidationErrors };
