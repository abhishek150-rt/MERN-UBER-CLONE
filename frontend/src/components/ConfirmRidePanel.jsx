import {
  RiArrowDownWideFill,
  RiCashFill,
  RiFlightLandFill,
  RiMapPin4Fill,
  RiUserFill,
} from "@remixicon/react";
import React from "react";

const ConfirmRidePanel = ({
  ridePanel,
  setRidePanel,
  setVehicleFound,
  ride,
  initiatedRide,
  pickup,
  destination,
}) => {
  return (
    <div>
      <h5
        className="p-1 flex justify-center w-[93%] absolute top-0"
        onClick={() => {
          setRidePanel(!ridePanel);
        }}
      >
        <RiArrowDownWideFill className="my-icon" color="#c1c0c0" />
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Confirm Your Ride</h3>

      <div className="flex gap-2 justify-between flex-col items-center">
        <img style={{ height: "10rem" }} src={ride?.image} alt="" />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <RiMapPin4Fill className="text-lg" />
            <div>
              <h3 className="text-md font-medium">{pickup}</h3>
              {/* <p className="text-sm text-gray-400 font-medium">
                Udhoy Vihar phase-5 , Gurugram
              </p> */}
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <RiFlightLandFill className="text-lg" />
            <div>
              <h3 className="text-md font-medium">{destination}</h3>
              {/* <p className="text-sm text-gray-400 font-medium">
                DLF Phase-3 , Gurugram
              </p> */}
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <RiCashFill className="text-lg" />
            <div>
              <h3 className="text-md font-medium">&#8377; {ride?.price}</h3>
              <p className="text-sm text-gray-400 font-medium">
                Cash on delivery
              </p>
            </div>
          </div>
        </div>
        <button
          className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg"
          onClick={() => {
            setVehicleFound(true);
            setRidePanel(false);
            initiatedRide();
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRidePanel;
