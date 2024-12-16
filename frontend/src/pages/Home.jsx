import React, { useRef, useState } from "react";
import Logo from "../assets/logo2.png";
import { useGSAP } from "@gsap/react";
import { RiArrowDownWideFill } from "@remixicon/react";
import gsap from "gsap";
import LocaltionPanel from "../components/LocationPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRidePanel from "../components/ConfirmRidePanel";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const ridePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const WaitingForDriverRef = useRef(null);

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const [panelOpen, setOpenPanel] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [ridePanel, setRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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

  console.log("vehiclePanel", vehiclePanel);

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
          src="https://i0.wp.com/www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png?fit=493%2C383&ssl=1"
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
            vehiclePanel={vehiclePanel}
            setVehiclePanel={setVehiclePanel}
            setOpenPanel={setOpenPanel}
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
        />
      </div>
      <div
        className="fixed z-100 bottom-6 bg-white px-3 py-6 w-full translate-y-full"
        ref={WaitingForDriverRef}
      >
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
