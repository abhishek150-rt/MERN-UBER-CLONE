import React, { useContext, useEffect, useRef, useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { Link } from "react-router-dom";
import { RiLogoutBoxFill } from "@remixicon/react";
import Logo from "../assets/logo2.png";
import CaptainDetails from "../components/CaptainDetails";
import RidesPopup from "../components/RidesPopup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../components/AcceptRidePopup";
import axios from "axios";

import { io } from "socket.io-client";

const CaptainHome = () => {
  const socketInstance = io("http://localhost:3001");
  const ridePanelRef = useRef();
  const acceptRideRef = useRef();
  const [ridePopup, setRidePopus] = useState(false);
  const [acceptRidePopup, setAcceptRidePopup] = useState(false);
  const [newRide, setNewRide] = useState(null);
  const { captain } = useContext(CaptainDataContext);

  const confirmRide = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/ride/confirm",
        { rideId: newRide?._id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response, "response");
    } catch (error) {
      console.log("error", error);
    }
  };

  socketInstance.on("new-ride", (data) => {
    if (data) {
      setNewRide(data);
      setRidePopus(true);
    }
  });

  useEffect(() => {
    if (!captain) return;

    socketInstance.emit("join", {
      userId: captain?._id,
      userType: "captain",
    });

    console.log("neew ride data-2", newRide);

    const updateLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const newLocation = { lat: latitude, lng: longitude };

            // Send the location to the server
            socketInstance.emit("update-captain-location", {
              userId: captain?._id,
              location: newLocation,
            });
          },
          (error) => {
            console.error("Error fetching location:", error);
          }
        );
      } else {
        console.warn("Geolocation is not supported by this browser.");
      }
    };

    // Update location every 10 seconds
    const interval = setInterval(updateLocation, 10000);

    // Initial location fetch
    updateLocation();

    return () => {
      socketInstance.disconnect();
      clearInterval(interval);
    };
  }, [captain]);

  useGSAP(
    function () {
      if (ridePopup) {
        gsap.to(ridePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopup]
  );

  useGSAP(
    function () {
      if (acceptRidePopup) {
        gsap.to(acceptRideRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(acceptRideRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [acceptRidePopup]
  );

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

      <div className="h-3/5">
        <img
          className="h-full object-cover w-full"
          src="https://blogadmin.uberinternal.com/wp-content/uploads/2017/10/ezgif.com-crop-1.gif"
          alt=""
        />
      </div>
      <div className="h-2/5 p-3">
        <CaptainDetails captain={captain} />
      </div>
      <div
        className="fixed z-100 bottom-6 bg-white px-3 py-6 w-full translate-y-full"
        ref={ridePanelRef}
      >
        <RidesPopup
          ridePopup={ridePopup}
          setRidePopus={setRidePopus}
          setAcceptRidePopup={setAcceptRidePopup}
          newRide={newRide}
          confirmRide={confirmRide}
        />
      </div>
      <div
        className="fixed z-100 bottom-6 bg-white px-3 py-6 w-full translate-y-full"
        ref={acceptRideRef}
      >
        <ConfirmRidePopup
          setAcceptRidePopup={setAcceptRidePopup}
          newRide={newRide}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
