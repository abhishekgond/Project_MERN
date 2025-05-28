import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
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
    introduction: {
      type: String,
      default: "My Nae is Abhishek Kumar Gond I am From Gorakhour",
    },
    location: {
      type: String,
      default: "India",
    },
    skills: [{ type: String, default: "Html,CSS,js " }],
    experience: [
      {
        title: {
          type: String,
          required: true,
          default: "5 years in the amazon",
        },
        company: { type: String, required: true, default: "amazon" },
        location: String,
        from: { type: Date, required: true, default: 2023 },
        to: Date,
        current: { type: Boolean, default: false },
        description: {
          type: String,
          default: "I am Working at amazon since 2025",
        },
      },
    ],
    education: [
      {
        school: {
          type: String,
          default: "Moti Lal Nehru National Institute of technology",
        },
        degree: {
          type: String,
          default: "MCA(Master Of Computer Application)",
        },
        fieldOfStudy: { type: String, default: "Computer Science" },
        from: { type: Date, required: true, default: 2023 },
        to: { type: Date, default: 2026 },
        current: { type: Boolean, default: false },
        description: { type: String, default: "Completed my Masters" },
      },
    ],
    location: { type: String, default: "India" },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male",
    },
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
