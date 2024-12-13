const { captainModel } = require("../models/captain.model");

const createCaptain = async (firstName, lastName, email, vehicle,password) => {
  if (!firstName || !email || !password || !vehicle) {
    throw new Error("All Fields are required");
  }
  const captain = captainModel.create({
    fullName: { firstName, lastName },
    email,
    password,
    vehicle: {
        vehicleType: vehicle.vehicleType,
      color:vehicle.color,
      capacity:vehicle.capacity,
      plate:vehicle.plate
    },
  });
  return captain;
};

module.exports = createCaptain;
