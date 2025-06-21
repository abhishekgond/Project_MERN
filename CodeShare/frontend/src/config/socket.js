import { io } from "socket.io-client";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const initSocket = async () => {
  // console.log("Attempting to connect to Socket.IO server at:", BACKEND_URL);

  const socket = io(BACKEND_URL, {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 10000,
  });

  socket.on("connect", () => {
    // console.log("Connected to Socket.IO server, socket ID:", socket.id);
  });

  socket.on("connect_error", (error) => {
    console.error("Socket.IO connection error:", error.message);
  });

  socket.on("reconnect_attempt", (attempt) => {
    // console.log(`Reconnection attempt ${attempt} to ${BACKEND_URL}`);
  });

  socket.on("reconnect_failed", () => {
    console.error("Reconnection failed after maximum attempts");
  });

  socket.on("error", (error) => {
    console.error("Socket.IO error:", error);
  });

  return socket;
};
