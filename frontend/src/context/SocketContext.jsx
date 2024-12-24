import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// Create Socket Context
const SocketContext = createContext();

// Socket Provider to wrap the entire app
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io("http://localhost:3001"); // Re
    // place with your server URL

    if (socketInstance) {
      setSocket(socketInstance);
    }

    socketInstance.on("connect", () => {
      console.log("Connected to socket server:", socketInstance.id);
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    socketInstance.on("receiveMessage", (message) => {
      console.log("Received message from server:", message);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to access the socket instance
export const useSocket = () => {
  const context = useContext(SocketContext);
  console.log("context", context);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
