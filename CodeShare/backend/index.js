// backend/server.js
import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";
import { setupSocket } from "./config/socket.js"; // your socket handler

// Load .env variables
dotenv.config();

const app = express();

// CORS: must allow frontend domain
app.use(
  cors({
    origin: process.env.CLIENT_URL, // e.g., https://your-frontend.vercel.app
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Express parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO with same CORS origin
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket logic
setupSocket(io);

// Test route to verify backend is alive
app.get("/", (req, res) => {
  res.status(200).send("✅ Backend is running");
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
