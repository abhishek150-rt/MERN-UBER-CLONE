const blacklistTokenModel = require("../models/blacklistToken.model");
const jwt = require("jsonwebtoken");
const verifyToken = async (token) => {
  if (!token) throw new Error("Token not found");

  const isTokenBlackListed = await blacklistTokenModel.findOne({ token });
  if (isTokenBlackListed) throw new Error("Token expired");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};
module.exports = verifyToken;
