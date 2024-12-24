// import { getLocationAddressCoordinates } from "../services/map.service";
const locationModal = require("../models/location.model");
const {
  // getLocationAddressCoordinates,
  haversineDistance,
  getCoordinatesFromLocation,
} = require("../services/map.service");

const getCoordinates = async (req, res) => {
  try {
    const { address } = req.query;

    if (!address) {
      return res.status(400).json({
        status: "error",
        message: "Address query parameter is required",
      });
    }

    // const response = await getLocationAddressCoordinates(address);
    const response = await locationModal.findOne({ name: address });

    if (response) {
      return res.status(200).json({
        status: "success",
        message: "Coordinates fetched successfully",
        data: response,
      });
    }

    return res.status(404).json({
      status: "error",
      message: "Coordinates not found for the given address",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error?.message || "Something went wrong",
    });
  }
};

const getDistanceAndTime = async (req, res) => {
  try {
    const { source, destination } = req.query;

    if (!source || !destination) {
      return res.status(400).json({
        message: "Both source and destination query parameters are required.",
      });
    }

    const sourceCoords = await getCoordinatesFromLocation(source);
    const destinationCoords = await getCoordinatesFromLocation(destination);

    const distance = haversineDistance(
      sourceCoords.lat,
      sourceCoords.lng,
      destinationCoords.lat,
      destinationCoords.lng
    );

    const avgSpeed = 50;
    const time = (distance / avgSpeed).toFixed(2);

    // Return the response
    return res.status(200).json({
      status: "success",
      message: "Distance and time fetched successfully",
      data: {
        distance: `${distance.toFixed(2)} km`,
        duration: `${(time * 60).toFixed(0)} mins`,
      },
    });
  } catch (error) {
    console.error("Error calculating distance and time:", error.message);
    return res
      .status(500)
      .json({ message: error.message || "Something went wrong" });
  }
};

const getAutocompleteSuggestions = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required." });
    }

    const suggestions = await locationModal
      .find({
        name: { $regex: query, $options: "i" },
      })
      .limit(10);

    return res.status(200).json({
      status: "success",
      message: "Autocomplete suggestions fetched successfully",
      data: suggestions.map((location) => ({
        name: location.name,
        latitude: location.lat,
        longitude: location.lng,
      })),
    });
  } catch (error) {
    console.error("Error fetching autocomplete suggestions:", error.message);
    return res
      .status(500)
      .json({ message: error.message || "Something went wrong" });
  }
};
module.exports = {
  getCoordinates,
  getDistanceAndTime,
  getAutocompleteSuggestions,
};
