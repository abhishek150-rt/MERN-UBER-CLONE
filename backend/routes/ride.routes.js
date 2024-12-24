const express = require("express");
const { authUser, authCaptain } = require("../middlewares/auth.middleware");
const validateRide = require("../middlewares/rideValidation.middleware");
const {
  createRide,
  getFare,
  confirmRide,
  startRide,
  finishRide
} = require("../controllers/ride.controller");

const router = express.Router();

router.post("/create", authUser, validateRide, createRide);
router.post("/get-fare", authUser, getFare);
router.post("/confirm", authCaptain, confirmRide);
router.post("/start-ride", authCaptain, startRide);
router.post("/finish-ride", authCaptain, finishRide);
module.exports = router;
