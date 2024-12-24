import { RiArrowDownWideFill, RiLogoutBoxFill } from "@remixicon/react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo2.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRiding from "../components/FinishRiding";
import axios from "axios";
import Livetracking from "../components/Livetracking";
const CaptainRiding = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const finishRideRef = useRef(null);
  const [finishRide, setFinishRide] = useState(false);
  const [rideDto, setRideDto] = useState(null);

  const finishCurrentRide = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/ride/finish-ride",
        { rideId: rideDto?._id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response?.data?.status === "success") {
        alert(response?.data?.message);
        navigate("/captainHome")
      }
    } catch (error) {
      console.log(error);
    }
  };

  useGSAP(
    function () {
      if (finishRide) {
        gsap.to(finishRideRef.current, {
          transform: "translate(0px, 25px)",
        });
      } else {
        gsap.to(finishRideRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRide]
  );

  useEffect(() => {
    if (location?.state) {
      setRideDto(location?.state);
    }
  }, [location]);

  return (
    <div className="h-screen">
      <div className="flex items-center justify-between fixed">
        <img src={Logo} className="w-16" alt="" />
        <Link
          to="/home"
          style={{ height: "2rem", width: "2rem" }}
          className="bg-black text-white flex items-center rounded-full justify-center fixed right-1"
        >
          <RiLogoutBoxFill className="text-lg font-medium" size={"20px"} />
        </Link>
      </div>

      <div className="h-4/5">
        <Livetracking/>
      </div>

      <div className="h-1/5 bg-yellow-400 p-6 flex justify-between items-center relative">
        <h5 className="p-1 flex justify-center w-[93%] absolute top-0">
          {/* <RiArrowDownWideFill className="my-icon" /> */}
        </h5>
        <h4 className="text-xl font-semibold">4 Km away</h4>
        <button
          className="w-1/2 bg-green-600 text-white font-semibold p-2 rounded-lg"
          onClick={() => setFinishRide(true)}
        >
          Complete Ride
        </button>
      </div>

      <div
        className="fixed z-100 bottom-0 bg-white px-3 py-2 w-full translate-y-full"
        ref={finishRideRef}
      >
        <FinishRiding
          setFinishRide={setFinishRide}
          finishRide={finishRide}
          rideDto={rideDto}
          finishCurrentRide={finishCurrentRide}
        />
      </div>
    </div>
  );
};

export default CaptainRiding;
