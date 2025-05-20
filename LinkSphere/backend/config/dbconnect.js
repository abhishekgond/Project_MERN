import mongoose from "mongoose";

export const dbconnect = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error ", error);
  }
};
