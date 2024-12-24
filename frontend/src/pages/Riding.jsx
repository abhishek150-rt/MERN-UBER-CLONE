import { RiCashFill, RiFlightLandFill, RiHomeLine } from "@remixicon/react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { UserDataContext } from "../context/UserContext";
import Livetracking from "../components/Livetracking";

const Riding = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserDataContext);
  const socketInstance = io("http://localhost:3001");
  const location = useLocation();
  const [rideDto, setRideDto] = useState(null);

  useEffect(() => {
    if (!user) return;

    socketInstance.emit("join", {
      userId: user?._id,
      userType: "user",
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [user]);

  useEffect(() => {
    socketInstance.on("ride-completed", (data) => {
      console.log("dkdkkdkdk", data);
      if (data) {
        navigate("/home");
      }
    });
  }, [socketInstance]);

  useEffect(() => {
    if (location?.state) {
      setRideDto(location.state);
    }
  }, [location]);
  return (
    <div className="h-screen">
      <Link
        to="/home"
        style={{ height: "2rem", width: "2rem" }}
        className="fixed right-2 top-2 bg-white flex items-center rounded-full justify-center"
      >
        <RiHomeLine className="text-lg font-medium" size={"20px"} />
      </Link>
      <div className="h-1/2">
        <Livetracking/>
      </div>
      <div className="h-1/2 p-3">
        <div className="flex items-center justify-between text-right">
          <img
            className="h-20"
            src={
              "https://i.pinimg.com/474x/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.jpg"
            }
          />
          <div>
            <h2 className="text-lg font-medium">
              {rideDto?.captain?.fullName?.firstName} &nbsp;
              {rideDto?.captain?.fullName?.lastName}
            </h2>
            <h4 className="text-xl font-semibold -mt-2 -mb-1">
              {rideDto?.captain?.vehicle?.plate}
            </h4>
            <p className="text-sm text-gray-600 ">Maruti Suzuki Alto</p>
          </div>
        </div>

        <div className="flex gap-2 justify-between flex-col items-center">
          <div className="w-full mt-3">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <RiFlightLandFill className="text-lg" />
              <div>
                <h3 className="text-md font-medium">{rideDto?.destination}</h3>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3">
              <RiCashFill className="text-lg" />
              <div>
                <h3 className="text-md font-medium">&#8377; {rideDto?.fare}</h3>
                <p className="text-sm text-gray-400 font-medium">
                  Cash on delivery
                </p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">
          Make a payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
