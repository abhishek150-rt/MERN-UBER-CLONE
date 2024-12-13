require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser= require("cookie-parser")
const { connectDB } = require("./db/db");
const app = express();
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/api/user/", userRoutes);
app.use("/api/captain/",captainRoutes)

connectDB();

module.exports = { app };
