import {
  RiArrowDownWideFill,
  RiCashFill,
  RiFlightLandFill,
  RiMapPin4Fill,
} from "@remixicon/react";
import React from "react";

const WaitingForDriver = ({ setWaitingForDriver, driverDetails }) => {
  return (
    <>
      <div>
        <h5
          className="p-1 flex justify-center w-[93%] absolute top-0"
          onClick={() => {
            setWaitingForDriver(false);
          }}
        >
          <RiArrowDownWideFill className="my-icon" color="#c1c0c0" />
        </h5>

        <div className="flex items-center justify-between text-right">
          <img
            className="h-20"
            src={
              "https://i.pinimg.com/474x/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.jpg"
            }
          />
          <div>
            <h2 className="text-lg font-medium">
              {driverDetails?.captain?.fullName?.firstName}
              &nbsp;
              {driverDetails?.captain?.fullName?.lastName}
            </h2>
            <h4 className="text-xl font-semibold -mt-2 -mb-1">
              {driverDetails?.captain?.vehicle?.plate}
            </h4>
            <p className="text-sm text-gray-600 ">Maruti Suzuki Alto</p>
            <p className="text-md text-red-600 font-semibold">
              {driverDetails?.otp && <span>OTP :</span>}
              {driverDetails?.otp}
            </p>
          </div>
        </div>

        <div className="flex gap-2 justify-between flex-col items-center">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <RiMapPin4Fill className="text-lg" />
              <div>
                <h3 className="text-md font-medium">{driverDetails?.pickup}</h3>
                {/* <p className="text-sm text-gray-400 font-medium">
                  Udhoy Vihar phase-5 , Gurugram
                </p> */}
              </div>
            </div>
            <div className="flex items-center gap-5 p-3 border-b-2">
              <RiFlightLandFill className="text-lg" />
              <div>
                <h3 className="text-md font-medium">
                  {driverDetails?.destination}
                </h3>
                {/* <p className="text-sm text-gray-400 font-medium">
                  DLF Phase-3 , Gurugram
                </p> */}
              </div>
            </div>
            <div className="flex items-center gap-5 p-3">
              <RiCashFill className="text-lg" />
              <div>
                <h3 className="text-md font-medium">
                  &#8377; {driverDetails?.fare}
                </h3>
                <p className="text-sm text-gray-400 font-medium">
                  Cash on delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaitingForDriver;
