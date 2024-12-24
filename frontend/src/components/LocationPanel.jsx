import React from "react";
import { RiMapPin2Fill } from "@remixicon/react";

const LocationPanel = ({
  pickupSuggestions,
  destinationSuggestions,
  setVehiclePanel,
  setOpenPanel,
  setPickup,
  setDestination,
  getFare
}) => {
  return (
    <div>
      {pickupSuggestions && pickupSuggestions.length > 0 ? (
        pickupSuggestions.map((location) => (
          <div
            onClick={() => {
              setPickup(location.name);
              // setVehiclePanel(true);
              // setOpenPanel(false);
            }}
            key={location.id}
            className="my-4 rounded-lg p-1 active:border-2 border-black flex items-center justify-start"
          >
            <h2 className="bg-[#eee] flex justify-center items-center h-10 w-10 rounded-full mr-3">
              <RiMapPin2Fill />
            </h2>
            <h4 className="font-medium">{location.name}</h4>
          </div>
        ))
      ) : (
        <p>No suggestions available</p>
      )}

      {destinationSuggestions && destinationSuggestions.length > 0 ? (
        destinationSuggestions.map((location) => (
          <div
            onClick={() => {
              setDestination(location.name);
              setVehiclePanel(true);
              setOpenPanel(false);
              getFare(location.name)
            }}
            key={location.id}
            className="my-4 rounded-lg p-1 active:border-2 border-black flex items-center justify-start"
          >
            <h2 className="bg-[#eee] flex justify-center items-center h-10 w-10 rounded-full mr-3">
              <RiMapPin2Fill />
            </h2>
            <h4 className="font-medium">{location.name}</h4>
          </div>
        ))
      ) : (
        <p>No suggestions available</p>
      )}
    </div>
  );
};

export default LocationPanel;
