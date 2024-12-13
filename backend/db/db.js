const mongoose = require("mongoose");

const MONGO_DB_URI = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI, {});
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

module.exports = { connectDB };
