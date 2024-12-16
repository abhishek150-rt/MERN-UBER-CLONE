const blacklistTokenModel = require("../models/blacklistToken.model.js");
const { userModel } = require("../models/user.model.js");
const { handleValidationErrors } = require("../services/error.service.js");
const userService = require("../services/user.service");

// Register User
const registerUser = async (req, res) => {
  if (handleValidationErrors(req, res)) return;

  const {
    fullName: { firstName, lastName },
    email,
    password,
  } = req.body;

  try {
    const userAlreadyExist = await userModel.findOne({ email });
    if (userAlreadyExist) {
      return res.status(400).json({ message: "User already exist" });
    }

    const hashedPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = user.generateToken();
    return res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Error registering user." });
  }
};

// Login User
const loginUser = async (req, res) => {
  if (handleValidationErrors(req, res)) return;

  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = user.generateToken();
    res.cookie("token", token);
    return res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error" });
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({ data: req.user, status: "success" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error" });
  }
};

// Logout User
const logoutUser = async (req, res) => {
  console.log("reeeee",req)
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    await blacklistTokenModel.create({ token });

    res.clearCookie("token");
    return res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error" });
  }
};

module.exports = { registerUser, loginUser, getUserProfile, logoutUser };
