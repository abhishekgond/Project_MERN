import express from "express";
import { logIn, logOut, signUp } from "../controllers/auth_controller.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", logIn);
authRoutes.get("/logout", logOut);
export default authRoutes;
