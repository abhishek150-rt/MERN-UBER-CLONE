const { userModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blacklistTokenModel = require("../models/blacklistToken.model");

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    const isTokenBlackListed = await blacklistTokenModel.findOne({
      token: token,
    });
    if (isTokenBlackListed) {
      return res.status(401).json({ message: "Token Expired" });
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded._id);
      if (user) req.user = user;
      return next();
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired. Please log in again." });
    }
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = { authUser };
