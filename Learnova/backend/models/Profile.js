import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Other",
    },

    contactNo: {
      type: String,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Invalid phone number"], // Indian format
    },

    dateOfBirth: {
      type: Date,
    },

    about: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    education: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    experience: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    skills: {
      type: [String],
      default: [],
    },

    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true },
      zipCode: { type: String, trim: true },
    },

    linkedin: {
      type: String,
      trim: true,
      match: [/^https?:\/\/(www\.)?linkedin\.com\/.+$/, "Invalid LinkedIn URL"],
    },

    github: {
      type: String,
      trim: true,
      match: [/^https?:\/\/(www\.)?github\.com\/.+$/, "Invalid GitHub URL"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
