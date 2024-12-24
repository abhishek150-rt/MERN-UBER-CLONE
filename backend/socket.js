// socket.js

const socketIo = require("socket.io");
let io; // Initialize the socket instance

const { userModel } = require("./models/user.model");
const { captainModel } = require("./models/captain.model");
// Store connected socket ids
let socketConnections = {};

// Function to initialize the socket server
const initializeSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: "*", // You can specify allowed origins here
      methods: ["GET", "POST"],
    },
  });

  // Event listener for new connections
  io.on("connection", (socket) => {
    socket.on("join", async (data) => {
      const { userId, userType } = data;

      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      }
    });

    socket.on("update-captain-location", async (data) => {
      const { userId, location } = data;
      if (!userId || !location || !location.lat || !location.lng) return;
      await captainModel.findByIdAndUpdate(userId, { location });
    });

    // Store the socket connection in the object
    socketConnections[socket.id] = socket;

    // Listen for disconnect event
    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
      // Clean up when a socket disconnects
      delete socketConnections[socket.id];
    });
  });
};

// Function to send a message to a specific socketId
const sendMessageToSocket = (socketId, messageObj) => {
  console.log("socketId", messageObj);
  if (!io) {
    console.log("Socket server is not initialized.");

    return;
  }
  io.to(socketId).emit(messageObj.event, messageObj.data);
};

module.exports = { initializeSocket, sendMessageToSocket };
