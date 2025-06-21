import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";
import { setupSocket } from "./config/socket.js"; // Modularized socket handlers

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
// console.log("frontend Url are  " + process.env.CLIENT_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO with proper CORS config
const io = new SocketIOServer(server, {
  cors: {
    origin: "*", // Allow from all origins (you can restrict it to your frontend URL)
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = {}; // socket.id -> userName
const roomCodeMap = {}; // roomId -> latest code

// Helper: Get all connected clients in a room
const getAllConnectedClients = (roomId) => {
  const room = io.sockets.adapter.rooms.get(roomId);
  if (!room) return [];
  return Array.from(room).map((socketId) => ({
    socketId,
    userName: userSocketMap[socketId] || "Unknown",
  }));
};

// Socket.IO Connection
io.on("connection", (socket) => {
  // console.log(`✅ Connected: ${socket.id}`);

  socket.on("join", ({ roomId, userName }) => {
    if (typeof roomId !== "string" || typeof userName !== "string") {
      console.error(`❌ Invalid join payload from ${socket.id}`);
      socket.emit("error", "Invalid join data.");
      return;
    }

    // Save user and join room
    userSocketMap[socket.id] = userName;
    socket.join(roomId);

    const clients = getAllConnectedClients(roomId);

    // Notify all users about the new joiner
    clients.forEach((client) => {
      io.to(client.socketId).emit("newUser", {
        clients,
        userName,
        socketId: socket.id,
      });
    });

    // Broadcast that a user joined
    socket.to(roomId).emit("user-joined", {
      clients,
      newUser: { socketId: socket.id, userName },
    });

    // Sync existing code to the newly joined user
    if (roomCodeMap[roomId]) {
      io.to(socket.id).emit("code-sync", {
        socketId: socket.id,
        code: roomCodeMap[roomId],
      });
    }
  });

  socket.on("join-room", ({ roomId }) => {
    if (typeof roomId !== "string") {
      console.error(`❌ Invalid join-room payload from ${socket.id}`);
      socket.emit("error", "Invalid roomId.");
      return;
    }

    // Use the userName from the "join" event, or assign a default
    const userName =
      userSocketMap[socket.id] || `User-${socket.id.slice(0, 5)}`;
    userSocketMap[socket.id] = userName;

    socket.join(roomId);

    // Sync existing code to the newly joined user
    if (roomCodeMap[roomId]) {
      io.to(socket.id).emit("code-sync", {
        socketId: socket.id,
        code: roomCodeMap[roomId],
      });
    }
  });

  socket.on("code-change", ({ roomId, code }) => {
    roomCodeMap[roomId] = code; // Save latest code for the room
    socket.to(roomId).emit("code-change", { code });
  });

  socket.on("sync-code", ({ socketId }) => {
    const roomId = Array.from(socket.rooms).find((id) => id !== socket.id);
    if (roomId && roomCodeMap[roomId]) {
      io.to(socketId).emit("code-sync", { code: roomCodeMap[roomId] });
    }
  });

  socket.on("user-left", ({ roomId, userName, socketId }) => {
    socket.leave(roomId);
    const clients = getAllConnectedClients(roomId);

    io.to(roomId).emit("user-left", {
      socketId,
      userName,
    });

    io.to(roomId).emit("newUser", {
      clients,
      userName,
      socketId,
    });
  });

  socket.on("disconnect", () => {
    const userName = userSocketMap[socket.id];
    // console.log(`❌ Disconnected: ${socket.id} (${userName || "Unknown"})`);
    delete userSocketMap[socket.id];

    for (const roomId of socket.rooms) {
      if (roomId !== socket.id) {
        const clients = getAllConnectedClients(roomId);

        io.to(roomId).emit("user-left", {
          socketId: socket.id,
          userName: userName || "Unknown",
        });

        io.to(roomId).emit("newUser", {
          clients,
          userName,
          socketId: socket.id,
        });
      }
    }
  });

  socket.on("error", (err) => {
    console.error(`🚨 Socket error from ${socket.id}:`, err);
  });
});

// Initialize socket logic
setupSocket(io);

// Default route for checking backend status
app.get("/", (req, res) => {
  res.status(200).send("✅ Backend is running");
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server listening on ${PORT}`);
});
