import {
    RiMapPin2Fill,
  } from "@remixicon/react";
  import React from "react";
  
  const locations = [
    { id: 1, name: "NKC Projects PVT Ltd Udhoyg vihar, Phase 5" },
    { id: 2, name: "Ambience Mall, Gurugram" },
    { id: 3, name: "Cyber Hub, Gurugram" },
    { id: 4, name: "DLF Mall of India, Noida" },
  ];
  
  const LocationPanel = ({vehiclePanel,setVehiclePanel,setOpenPanel}) => {
    return (
      <div>
        {locations.map((location) => (
          <div
          onClick={()=>{
            setVehiclePanel(true)
            setOpenPanel(false)
          }}
            key={location.id}
            className="my-4 rounded-lg p-1 active:border-2 border-black flex items-center justify-start"
          >
            <h2 className="bg-[#eee] flex justify-center items-center h-10 w-10 rounded-full mr-3">
              <RiMapPin2Fill />
            </h2>
            <h4 className="font-medium">{location.name}</h4>
          </div>
        ))}
      </div>
    );
  };
  
  export default LocationPanel;
  