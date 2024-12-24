const { captainModel } = require("../models/captain.model");
const locationModal = require("../models/location.model");
const rideModel = require("../models/ride.model");
const haversine = require("haversine");

const getLatLngFromLocation = async (locationName) => {
  const location = await locationModal.findOne({ name: locationName });

  if (!location || !location.lat || !location.lng) {
    throw new Error(`Invalid location name: ${locationName}`);
  }

  return {
    latitude: parseFloat(location.lat),
    longitude: parseFloat(location.lng),
  };
};

// getFare function to calculate fares for different vehicle types
const getFare = (pickup, destination) => {
  if (
    !pickup ||
    !destination ||
    !pickup.latitude ||
    !pickup.longitude ||
    !destination.latitude ||
    !destination.longitude
  ) {
    throw new Error(
      "Pickup and destination must have valid latitude and longitude."
    );
  }

  const distance = haversine(pickup, destination, { unit: "km" });

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

const generateOtp = () => {
  const digits = "0123456789";
  let otp = "";

  // Generate a random OTP of the desired length
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length); // Get a random index
    otp += digits[randomIndex];
  }

  return otp;
};

// createRide function to create a new ride in the database
async function createNewRide(user, pickupName, destinationName, vehicleType) {
  if (!user || !pickupName || !destinationName || !vehicleType) {
    throw new Error("All fields are required");
  }

  const pickup = await getLatLngFromLocation(pickupName);
  const destination = await getLatLngFromLocation(destinationName);

  // Calculate fares
  const fareDetails = getFare(pickup, destination);

  if (!fareDetails[vehicleType]) {
    throw new Error(`Invalid vehicle type: ${vehicleType}`);
  }

  const fare = fareDetails[vehicleType];

  const otp = generateOtp();
  // Create ride in the database
  const ride = await rideModel.create({
    user,
    pickup: pickupName,
    destination: destinationName,
    fare,
    vehicleType,
    otp,
  });

  return ride;
}

async function confirmRide(rideId, captainId) {
  if (rideId && captainId) {
    await rideModel.findOneAndUpdate(
      { _id: rideId },
      {
        status: "accepted",
        captain: captainId,
      }
    );
    const ride = await rideModel.findOne({ _id: rideId }).populate("user");
    return ride;
  }
}

async function startRide(rideId, otp) {
  if (rideId) {
    const newRide = await rideModel.findById(rideId).select("+otp");
    console.log("rideOtp", newRide);
    if (newRide.otp !== otp) {
      throw new Error(`Invalid OTP`);
    }
    await rideModel.findOneAndUpdate(
      { _id: rideId },
      {
        status: "started",
      }
    );
    const ride = await rideModel
      .findOne({ _id: rideId })
      .populate("user")
      .populate("captain");
    return ride;
  }
}

async function finishRide(rideId) {
  if (rideId) {
    await rideModel.findOneAndUpdate(
      { _id: rideId },
      {
        status: "completed",
      }
    );
    const ride = await rideModel
      .findOne({ _id: rideId })
      .populate("user")
      .populate("captain");
    return ride;
  }
}

async function findCaptainsWithinRadius(ltd, lng, radius) {
  const radiusInRadians = radius / 6371;

  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radiusInRadians],
      },
    },
  });

  return captains;
}

module.exports = {
  createNewRide,
  findCaptainsWithinRadius,
  confirmRide,
  startRide,
  finishRide
};
