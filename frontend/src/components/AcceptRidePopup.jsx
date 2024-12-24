import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  RiArrowDownWideFill,
  RiCashFill,
  RiFlightLandFill,
  RiMapPin4Fill,
} from "@remixicon/react";
import axios from "axios";

const AcceptRidePopup = ({ setAcceptRidePopup, newRide }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(null);

  const handleSubmit = async () => {
    const payload = {
      rideId: newRide?._id,
      otp: otp,
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/api/ride/start-ride",
        payload,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response?.data?.status === "success") {
        navigate("/captainRiding", {
          state: response?.data?.ride,
        });
      } else alert(response?.data?.message);
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message);
    }
  };

  return (
    <div className="h-5/6">
      <div>
        <h5
          className="p-1 flex justify-center w-[93%] absolute top-0"
          onClick={() => {
            setAcceptRidePopup(false);
          }}
        >
          <RiArrowDownWideFill className="my-icon" color="#c1c0c0" />
        </h5>
        <h3 className="text-2xl font-semibold mb-5">
          Confirm this ride to start
        </h3>
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
                <p className="text-sm text-gray-400 font-medium">
                  DLF Phase-3 , Gurugram
                </p>
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
          <div className="mt-6">
            <form>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter your OTP"
                className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
              />
            </form>
            <button
              onClick={handleSubmit}
              className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg"
              type="submit"
            >
              Confirm
            </button>

            <button
              className="w-full mt-2 bg-red-600 text-white font-semibold p-2 rounded-lg"
              onClick={() => {
                setAcceptRidePopup(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcceptRidePopup;
