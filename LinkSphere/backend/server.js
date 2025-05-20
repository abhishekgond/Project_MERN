import express from "express";
import dotenv from "dotenv";
import { dbconnect } from "./config/dbconnect.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  dbconnect();
  console.log("server is running on port 3000");
});

app.get("/", (req, res) => {
  res.send("hello world");
});
