const axios = require("axios");
const locationModal = require("../models/location.model");

async function getLocationAddressCoordinates(address) {
  try {
    // Load the Google Maps API key from the environment variables
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      throw new Error(
        "Google Maps API key is not set in the environment variables."
      );
    }

    // Encode the address for use in the URL
    const encodedAddress = encodeURIComponent(address);

    // Construct the Google Maps Geocoding API URL
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

    // Make the API request
    const response = await axios.get(url);

    // Check if the response contains valid data
    if (response.data.status !== "OK") {
      throw new Error(`Geocoding failed: ${response.data.status}`);
    }

    // Extract coordinates from the response
    const { lat, lng } = response.data.results[0].geometry.location;

    return { lat, lng };
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    throw error; // Rethrow the error to handle it outside this function
  }
}

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

const getCoordinatesFromLocation = async (locationName) => {
  try {
    const location = await locationModal.findOne({ name: locationName });
    if (!location) {
      throw new Error(`Location "${locationName}" not found in the database.`);
    }
    return { lat: location.lat, lng: location.lng };
  } catch (error) {
    console.error("Error fetching location from database:", error.message);
    throw error;
  }
};

module.exports = {
  getLocationAddressCoordinates,
  haversineDistance,
  getCoordinatesFromLocation,
};
