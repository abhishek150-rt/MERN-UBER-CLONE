const blacklistTokenModel = require("../models/blacklistToken.model");
const { captainModel } = require("../models/captain.model");
const createCaptain = require("../services/captain.service");
const { handleValidationErrors } = require("../services/error.service");

const registerCaptain = async (req, res) => {
  try {
    if (handleValidationErrors(req, res)) return;

    const { fullName, email, password, vehicle } = req.body;
    const { firstName, lastName } = fullName;

    const captainAlreadyExist = await captainModel.findOne({ email });
    if (captainAlreadyExist) {
      return res.status(400).json({ message: "Captain already exists" });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    // Create new captain
    const newCaptain = await createCaptain(
      firstName,
      lastName,
      email,
      vehicle,
      hashedPassword
    );

    // Generate a token for the new captain
    const token = newCaptain.generateToken(); // Ensure generateToken is implemented properly

    // Send response with token and new captain data
    res.status(201).json({
      token,
      newCaptain,
      message: "Captain registration successful.",
    });
  } catch (error) {
    console.error(error.message, "message");
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

const loginCaptain = async (req, res) => {
  handleValidationErrors(req, res);

  const { email, password } = req.body;

  try {
    
    const captain = await captainModel.findOne({ email }).select("+password");

    if (!captain)
      return res.status(401).json({ message: "Invalid email or password." });

    const isMatch = await captain.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password." });

    const token = captain.generateToken();
    res.cookie("token", token);
    return res.status(200).json({ token, captain });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error" });
  }
};

const getCaptainProfile = async (req, res) => {
  try {
    if (!req.captain) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({ data: req.captain, status: "success" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error" });
  }
};

const logoutCaptain = async (req, res) => {
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

module.exports = { registerCaptain, loginCaptain, getCaptainProfile,logoutCaptain };
