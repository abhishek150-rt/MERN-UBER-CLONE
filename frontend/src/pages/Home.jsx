import React, { useRef, useState, useEffect, useContext } from "react";
import axios from "axios"; // Import axios
import Logo from "../assets/logo2.png";
import { useGSAP } from "@gsap/react";
import { RiArrowDownWideFill } from "@remixicon/react";
import gsap from "gsap";
import LocaltionPanel from "../components/LocationPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRidePanel from "../components/ConfirmRidePanel";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { UserDataContext } from "../context/UserContext";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
// import { useSocket } from "../context/SocketContext";

const Home = () => {
  const navigate = useNavigate();
  const socketInstance = io("http://localhost:3001");
  const { user } = useContext(UserDataContext);
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const ridePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const WaitingForDriverRef = useRef(null);

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [panelOpen, setOpenPanel] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [ridePanel, setRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [fare, setFare] = useState(null);
  const [ride, setRide] = useState(null);
  const [driverDetails, setDriverDetails] = useState({
    _id: "676ace21ce05c062f24f91b4",
    user: "67643be9d366f1f99f5388a9",
    pickup: "DLF Phase 3",
    destination: "DLF Phase 5",
    fare: 127.6,
    status: "accepted",
    __v: 0,
    captain: {
      fullName: {
        firstName: "ABHISHEK",
        lastName: "NEGI",
      },
      vehicle: {
        color: "red",
        vehicleType: "car",
        plate: "UK071234",
        capacity: 4,
      },
      location: {
        lat: 28.4918026,
        lng: 77.0954533,
      },
      _id: "67643bf8d366f1f99f5388ac",
      email: "abhishek@gmail.com",
      status: "inactive",
      __v: 0,
      socketId: "WhU_gj1J-2js3pp6AAFX",
    },
  });

  socketInstance.on("ride-confirmed", (data) => {
    if (data) {
      setDriverDetails(data);
      setVehicleFound(false);
      setWaitingForDriver(true);
      alert("Ride confirmmed by driver.");
    }
  });

  socketInstance.on("ride-started", (data) => {
    if (data)
      navigate("/riding", {
        state: data,
        
      });
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Fetch suggestions for pickup and destination
  const fetchLocationSuggestions = async (query, type) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/map/get-locationSuggestion`,
        {
          params: { query },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (type === "pickup") {
        setPickupSuggestions(response.data.data);
      } else if (type === "destination") {
        setDestinationSuggestions(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching location suggestions", error);
    }
  };

  const getFare = async (destinationLoc) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/ride/get-fare",
        { pickup, destination: destinationLoc },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response?.data?.fare) {
        setFare(response?.data?.fare);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const initiatedRide = async () => {
    const payload = {
      userId: user?._id,
      pickup: pickup,
      destination: destination,
      vehicleType: ride.vehicleType,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/ride/create",
        payload,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response?.data?.status === "success") {
        alert(response?.data?.message);
      } else {
        alert(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Call fetchLocationSuggestions on input change
  useEffect(() => {
    if (pickup) {
      fetchLocationSuggestions(pickup, "pickup");
    } else {
      setPickupSuggestions([]);
    }
  }, [pickup]);

  useEffect(() => {
    if (destination) {
      fetchLocationSuggestions(destination, "destination");
    } else {
      setDestinationSuggestions([]);
    }
  }, [destination]);

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (ridePanel) {
        gsap.to(ridePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePanel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(WaitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(WaitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  return (
    <div className="h-screen relative overflow-hidden">
      <img src={Logo} className="w-16 absolute left-5 top-5" alt="" />

      <div className="h-screen w-screen">
        <img
          className="h-full object-cover w-full"
          src="https://blogadmin.uberinternal.com/wp-content/uploads/2017/10/ezgif.com-crop-1.gif"
          alt=""
        />
      </div>

      <div className=" flex flex-col justify-end absolute h-screen  w-full top-0">
        <div className="h-[30%] bg-white relative p-5">
          <h4
            ref={panelCloseRef}
            className="absolute opacity-0 right-6 top-6"
            onClick={() => setOpenPanel(!panelOpen)}
          >
            <RiArrowDownWideFill className="my-icon" />
          </h4>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              onClick={() => setOpenPanel(true)}
              placeholder="Enter pickup location"
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
            />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onClick={() => setOpenPanel(true)}
              placeholder="Enter destination location"
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
            />
          </form>
        </div>
        <div className="p-3 bg-white" ref={panelRef}>
          <LocaltionPanel
            pickupSuggestions={pickupSuggestions}
            destinationSuggestions={destinationSuggestions}
            setVehiclePanel={setVehiclePanel}
            setOpenPanel={setOpenPanel}
            setPickup={setPickup}
            setDestination={setDestination}
            getFare={getFare}
          />
        </div>
      </div>

      <div
        className="fixed z-100 bottom-6 bg-white px-3 py-6 w-full translate-y-full"
        ref={vehiclePanelRef}
      >
        <VehiclePanel
          vehiclePanel={vehiclePanel}
          setVehiclePanel={setVehiclePanel}
          setRidePanel={setRidePanel}
          fare={fare}
          setRide={setRide}
        />
      </div>
      <div
        className="fixed z-100 bottom-6 bg-white px-3 py-6 w-full translate-y-full"
        ref={ridePanelRef}
      >
        <ConfirmRidePanel
          ridePanel={ridePanel}
          setRidePanel={setRidePanel}
          setVehicleFound={setVehicleFound}
          pickup={pickup}
          destination={destination}
          ride={ride}
          initiatedRide={initiatedRide}
        />
      </div>
      <div
        className="fixed z-100 bottom-6 bg-white px-3 py-6 w-full translate-y-full"
        ref={vehicleFoundRef}
      >
        <LookingForDriver
          ridePanel={ridePanel}
          setRidePanel={setRidePanel}
          setVehicleFound={setVehicleFound}
          pickup={pickup}
          destination={destination}
          ride={ride}
        />
      </div>
      <div
        className="fixed z-100 bottom-6 bg-white px-3 py-6 w-full translate-y-full"
        ref={WaitingForDriverRef}
      >
        <WaitingForDriver
          setWaitingForDriver={setWaitingForDriver}
          driverDetails={driverDetails}
        />
      </div>
    </div>
  );
};

export default Home;
