const rideService = require("../services/ride.service");
const { handleValidationErrors } = require("../services/error.service");
const haversine = require("haversine");
const { getCoordinatesFromLocation } = require("../services/map.service");
const { sendMessageToSocket } = require("../socket");
const rideModel = require("../models/ride.model");

const calculateFares = (pickup, destination) => {
  if (
    !pickup ||
    !destination ||
    !pickup.lat ||
    !pickup.lng ||
    !destination.lat ||
    !destination.lng
  ) {
    throw new Error(
      "Pickup and destination must have valid latitude and longitude."
    );
  }

  const pickupCoords = {
    latitude: parseFloat(pickup.lat),
    longitude: parseFloat(pickup.lng),
  };

  const destinationCoords = {
    latitude: parseFloat(destination.lat),
    longitude: parseFloat(destination.lng),
  };

  // Calculate distance using haversine
  const distance = haversine(pickupCoords, destinationCoords, { unit: "km" });

  if (!distance) {
    throw new Error("Unable to calculate distance.");
  }

  const fares = {
    car: { base: 50, perKm: 20 },
    auto: { base: 30, perKm: 15 },
    bike: { base: 10, perKm: 10 },
  };

  const calculatedFares = {};
  for (const [vehicleType, rates] of Object.entries(fares)) {
    calculatedFares[vehicleType] = (
      rates.base +
      rates.perKm * distance
    ).toFixed(2);
  }

  return calculatedFares;
};

async function createRide(req, res) {
  try {
    if (handleValidationErrors(req, res)) return;
    const { userId, pickup, destination, vehicleType } = req.body;
    const ride = await rideService.createNewRide(
      userId,
      pickup,
      destination,
      vehicleType
    );

    const pickupLoc = await getCoordinatesFromLocation(pickup);
    const { lat, lng } = pickupLoc;
    const captains = await rideService.findCaptainsWithinRadius(lat, lng, 100);

    ride.otp = "";

    res.status(200).json({
      status: "success",
      message: "Ride created successfully",
      data: ride,
    });

    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");
    if (captains && captains.length > 0) {
      captains.map((captain) => {
        sendMessageToSocket(captain.socketId, {
          event: "new-ride",
          data: rideWithUser,
        });
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, status: "failed" });
  }
}

async function getFare(req, res) {
  try {
    const { pickup, destination } = req.body;
    if (!pickup || !destination) {
      return res.status(400).json({
        message: "Pickup and destination data is required.",
        status: "failed",
      });
    }

    const pickupLoc = await getCoordinatesFromLocation(pickup);
    const destinationLoc = await getCoordinatesFromLocation(destination);
    // Get fare for all vehicle types (car, auto, bike)
    const fareDetails = calculateFares(pickupLoc, destinationLoc);

    res.status(200).json({
      message: "Fare calculation successful",
      status: "success",
      fare: fareDetails,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "failed" });
  }
}

async function confirmRide(req, res) {
  try {
    const { rideId } = req.body;
    if (!rideId)
      return res
        .status(400)
        .json({ message: "Invalid ride id", status: "failure" });
    const ride = await rideService.confirmRide(rideId, req?.captain?._id);

    const rideDto = await rideModel
      .findOne({ _id: rideId })
      .populate("captain")
      .select("+otp");

    sendMessageToSocket(ride?.user?.socketId, {
      event: "ride-confirmed",
      data: rideDto,
    });
    res.status(200).json({ message: "Ride confirmed", ride });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "failed" });
  }
}

async function startRide(req, res) {
  try {
    const { rideId, otp } = req.body;
    if (!rideId || !otp)
      return res
        .status(400)
        .json({ message: "Ride id and otp missing", status: "failure" });
    const ride = await rideService.startRide(rideId, otp);

    const rideDto = await rideModel
      .findOne({ _id: rideId })
      .populate("captain")
      .populate("user");

    sendMessageToSocket(ride?.user?.socketId, {
      event: "ride-started",
      data: rideDto,
    });
    res
      .status(200)
      .json({ message: "Ride confirmed", ride, status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "failed" });
  }
}

async function finishRide(req, res) {
  try {
    const { rideId } = req.body;
    if (!rideId)
      return res
        .status(400)
        .json({ message: "Ride id  missing", status: "failure" });
    const ride = await rideService.finishRide(rideId);

    const rideDto = await rideModel
      .findOne({ _id: rideId })
      .populate("captain")
      .populate("user");

    sendMessageToSocket(ride?.user?.socketId, {
      event: "ride-completed",
      data: rideDto,
    });
    res
      .status(200)
      .json({ message: "Ride completed", ride, status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "failed" });
  }
}

module.exports = { createRide, getFare, confirmRide, startRide, finishRide };
