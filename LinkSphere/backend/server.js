import express from "express";
import dotenv from "dotenv";
import { dbconnect } from "./config/dbconnect.js";
import authRoutes from "./routes/auth_routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Taking value from body
app.use(cookieParser()); // using cookieParser
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRouter);
app.listen(PORT, () => {
  dbconnect();
  console.log("server is running on port 3000");
});

app.get("/", (req, res) => {
  res.send("hello world");
});
