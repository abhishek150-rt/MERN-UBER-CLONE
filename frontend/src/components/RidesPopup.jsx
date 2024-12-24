import {
  RiArrowDownWideFill,
  RiCashFill,
  RiFlightLandFill,
  RiMapPin4Fill,
} from "@remixicon/react";
import React from "react";

const RidesPopup = ({
  ridePopup,
  setRidePopus,
  setAcceptRidePopup,
  newRide,
  confirmRide,
}) => {
  return (
    <div>
      <div>
        {/* <h5
          className="p-1 flex justify-center w-[93%] absolute top-0"
          onClick={() => {
            setRidePopus(!ridePopup);
          }}
        >
          <RiArrowDownWideFill className="my-icon" color="#c1c0c0" />
        </h5> */}
        <h3 className="text-2xl font-semibold mb-5">New Ride available</h3>
        <div className="flex justify-between items-center p-3 bg-yellow-300 rounded-lg mt-4">
          <div className="flex items-center gap-3 mt-3">
            <img
              className="h-12 rounded-full object-cover w-12"
              src="https://media.licdn.com/dms/image/v2/C5103AQHnMnvjD3j8Uw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1580484244768?e=2147483647&v=beta&t=_hDJ9KBLmVmOnsPny39ORtSHZpOYe6a1GxygqIOvCZ4"
              alt=""
            />
            <h4 className="text-md font-medium">
              {newRide?.user?.fullName?.firstName}
              &nbsp; {newRide?.user?.fullName?.lastName}
            </h4>
          </div>
          <h5 className="text-lg font-semibold">2.5 Km</h5>
        </div>

        <div className="flex gap-2 justify-between flex-col items-center">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <RiMapPin4Fill className="text-lg" />
              <div>
                <h3 className="text-md font-medium">{newRide?.pickup}</h3>
                {/* <p className="text-sm text-gray-400 font-medium">
                  Udhoy Vihar phase-5 , Gurugram
                </p> */}
              </div>
            </div>
            <div className="flex items-center gap-5 p-3 border-b-2">
              <RiFlightLandFill className="text-lg" />
              <div>
                <h3 className="text-md font-medium">{newRide?.destination}</h3>
                {/* <p className="text-sm text-gray-400 font-medium">
                  DLF Phase-3 , Gurugram
                </p> */}
              </div>
            </div>
            <div className="flex items-center gap-5 p-3">
              <RiCashFill className="text-lg" />
              <div>
                <h3 className="text-md font-medium">&#8377; {newRide?.fare}</h3>
                <p className="text-sm text-gray-400 font-medium">
                  Cash on delivery
                </p>
              </div>
            </div>
          </div>
          <button
            className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg"
            onClick={() => {
              setRidePopus(false);
              setAcceptRidePopup(true);
              confirmRide();
            }}
          >
            Accept
          </button>
          <button
            className="w-full mt-1 bg-gray-300 text-gray-700 font-semibold p-2 rounded-lg"
            onClick={() => {
              setRidePopus(false);
            }}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidesPopup;
