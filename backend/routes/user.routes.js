const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
} = require("../controllers/user.controller");
const { authUser } = require("../middlewares/auth.middleware");
const {
  validateRegister,
  validateLogin,
} = require("../middlewares/validation.middleware");

router.post("/register", validateRegister, registerUser);

router.post("/login", validateLogin, loginUser);

router.get("/profile", authUser, getUserProfile);

router.get("/logout", authUser, logoutUser);

module.exports = router;
