const { Schema, model, default: mongoose } = require("mongoose");

const rideSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true, // corrected from "require" to "required"
  },
  captain: {
    // changed from "user" to "captain"
    type: mongoose.Schema.Types.ObjectId,
    ref: "captain",
  },
  pickup: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "started", "completed", "cancelled"],
    default: "pending",
  },
  duration: {
    type: Number,
  },
  distance: {
    type: Number,
  },
  paymentId: {
    type: String,
  },
  orderId: {
    type: String,
  },
  signature: {
    type: String,
  },
  otp: {
    type: String,
    select: false,
    required: true,
  },
});

const rideModel = model("ride", rideSchema);

module.exports = rideModel;
