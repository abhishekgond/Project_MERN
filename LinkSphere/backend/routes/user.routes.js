import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { getCurrentUser } from "../controllers/userControlers.js";

const userRouter = express.Router();
userRouter.get("/currentuser", isAuth, getCurrentUser);

export default userRouter;
