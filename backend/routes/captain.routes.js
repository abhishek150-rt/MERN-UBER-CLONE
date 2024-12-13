const express = require("express");
const {
  validateRegister,
  validateLogin,
} = require("../middlewares/captainValidation.middleware");
const { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain } = require("../controllers/captain.controller");
const { authCaptain } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", validateRegister, registerCaptain);
router.post("/login", validateLogin, loginCaptain);
router.get("/profile", authCaptain, getCaptainProfile);
router.get("/logout", authCaptain, logoutCaptain);
module.exports = router;
