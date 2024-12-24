import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

// Default location for Gurugram
const defaultCenter = {
  lat: 28.4595, // Latitude for Gurugram
  lng: 77.0266, // Longitude for Gurugram
};

// URL for the vehicle icon
const vehicleIcon = {
  url: "https://img.icons8.com/ios-filled/50/000000/car--v1.png", // Replace with your vehicle icon URL
  scaledSize: { width: 40, height: 40 }, // Size of the icon
};

const Livetracking = () => {
  const [currentLocation, setCurrentLocation] = React.useState(defaultCenter);

  React.useEffect(() => {
    let watchId;

    if (navigator.geolocation) {
      // Use setInterval to update location every 10 seconds
      const intervalId = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => console.error("Error fetching location: ", error),
          {
            enableHighAccuracy: true,
          }
        );
      }, 10000); // 10 seconds interval

      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyA5Lt3E5gYb-lfogvaSpCrvCpocLqHwNOI">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        zoom={14}
      >
        {/* Marker with a vehicle icon */}
        <Marker position={currentLocation} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Livetracking;
