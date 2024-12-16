import React from "react";
import { RiArrowDownWideFill, RiUserFill } from "@remixicon/react";

const VehiclePanel = ({ vehiclePanel, setVehiclePanel, setRidePanel }) => {
  const vehicles = [
    {
      name: "UberGo",
      image: "https://i.pinimg.com/474x/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.jpg",
      users: 4,
      arrivalTime: "2 mins away",
      description: "Affordable, compact rides",
      price: 245.50
    },
    {
      name: "Moto",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTJw6dzEo1MYXOAbONCG1oL82rxU_Bitb-g&s",
      users: 1,
      arrivalTime: "2 mins away",
      description: "Affordable, compact rides",
      price: 65.00
    },
    {
      name: "Auto",
      image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
      users: 2,
      arrivalTime: "2 mins away",
      description: "Affordable, compact rides",
      price: 115.50
    }
  ];

  return (
    <>
      <h3 className="text-2xl font-semibold mb-5">Choose a vehicle</h3>
      <h4
        className="absolute right-6 top-6"
        onClick={() => setVehiclePanel(false)}
      >
        <RiArrowDownWideFill className="my-icon" />
      </h4>

      {vehicles.map((vehicle, index) => (
        <div key={index} className="flex border-2 active:border-black mb-2 rounded-xl w-full items-center justify-between p-3"
        onClick={()=>{
            setVehiclePanel(false)
            setRidePanel(true)
        }}
        >
          <img src={vehicle.image} alt={vehicle.name} className="h-12" />
          <div className="w-1/2">
            <h4 className="font-medium text-base flex gap-2">
              {vehicle.name}
              <span className="flex">
                <RiUserFill size="18px" /> {vehicle.users}
              </span>
            </h4>
            <h5 className="font-medium text-md">{vehicle.arrivalTime}</h5>
            <p className="font-normal text-xs text-gray-600">{vehicle.description}</p>
          </div>
          <h2 className="text-lg font-semibold">&#8377; {vehicle.price}</h2>
        </div>
      ))}
    </>
  );
};

export default VehiclePanel;
