import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
      trim: true,
    },
    LastName: {
      type: String,
      required: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    headline: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPhoto: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    skills: [{ type: String }],
    experience: [
      {
        title: { type: String, required: true },
        company: { type: String, required: true },
        location: String,
        from: { type: Date, required: true },
        to: Date,
        current: { type: Boolean, default: false },
        description: String,
        description: { type: String },
      },
    ],
    education: [
      {
        school: { type: String },
        degree: { type: String },
        fieldOfStudy: { type: String },
        from: { type: Date, required: true },
        to: Date,
        current: { type: Boolean, default: false },
        description: String,
      },
    ],
    location: { type: String },
    gender: { type: String, enum: ["male", "female", "other"] },
    connections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    pendingRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    sentRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
