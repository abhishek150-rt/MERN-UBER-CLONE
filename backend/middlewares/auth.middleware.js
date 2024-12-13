const { userModel } = require("../models/user.model");
const { captainModel } = require("../models/captain.model");
const verifyToken = require("../services/token.service");

// Middleware to authenticate the User
const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    const decoded = await verifyToken(token);

    const user = await userModel.findById(decoded._id);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; // Attach the user to the request object
    return next();
  } catch (error) {
    const message =
      error.message === "Token expired"
        ? "Token expired. Please log in again."
        : "Unauthorized: Invalid token";
    return res.status(401).json({ message });
  }
};

// Middleware to authenticate the Captain
const authCaptain = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    const decoded = await verifyToken(token);

    const captain = await captainModel.findById(decoded._id);
   
    if (!captain) return res.status(401).json({ message: "Captain not found" });

    req.captain = captain; // Attach the captain to the request object
    return next();
  } catch (error) {
    const message =
      error.message === "Token expired"
        ? "Token expired. Please log in again."
        : "Unauthorized: Invalid token";
    return res.status(401).json({ message });
  }
};

module.exports = { authUser, authCaptain };
