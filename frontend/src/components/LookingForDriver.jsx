import { RiArrowDownWideFill, RiCashFill, RiFlightLandFill, RiMapPin4Fill } from "@remixicon/react";
import React from "react";

const LookingForDriver = ({setVehicleFound,setRidePanel,ridePanel}) => {
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
      <h3 className="text-2xl font-semibold mb-5">Looking for driver</h3>

      <div className="flex gap-2 justify-between flex-col items-center">
        <img
          style={{ height: "10rem" }}
          src={
            "https://i.pinimg.com/474x/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.jpg"
          }
          alt=""
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <RiMapPin4Fill className="text-lg" />
            <div>
              <h3 className="text-md font-medium">NKC Projects Pvt Ltd</h3>
              <p className="text-sm text-gray-400 font-medium">
                Udhoy Vihar phase-5 , Gurugram
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <RiFlightLandFill className="text-lg" />
            <div>
              <h3 className="text-md font-medium">44/2 U block</h3>
              <p className="text-sm text-gray-400 font-medium">
                DLF Phase-3 , Gurugram
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <RiCashFill className="text-lg" />
            <div>
              <h3 className="text-md font-medium">&#8377; 150.00</h3>
              <p className="text-sm text-gray-400 font-medium">
                Cash on delivery
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
