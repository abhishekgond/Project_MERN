import Profile from "../models/profile.js";
import User from "../models/User.js"; // Assuming you have a User model

// ===========================================================
// ✅ Create Profile
// ===========================================================
export const createProfile = async (req, res) => {
  try {
    const {
      gender,
      contactNo,
      dateOfBirth,
      about,
      education,
      experience,
      skills,
      address,
      linkedin,
      github,
      userId,
    } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const existingProfile = await Profile.findOne({ user: userId });
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists for this user",
      });
    }

    const profile = await Profile.create({
      gender,
      contactNo,
      dateOfBirth,
      about,
      education,
      experience,
      skills,
      address,
      linkedin,
      github,
      user: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: profile,
    });
  } catch (error) {
    console.error("Error while creating profile:", error);
    return res.status(500).json({
      success: false,
      message: "Error while creating profile",
    });
  }
};

// ===========================================================
// ✅ Update Profile
// ===========================================================
export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    const updatableFields = [
      "gender",
      "contactNo",
      "dateOfBirth",
      "about",
      "education",
      "experience",
      "skills",
      "address",
      "linkedin",
      "github",
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        profile[field] = req.body[field];
      }
    });

    await profile.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: profile,
    });
  } catch (error) {
    console.error("Error while updating profile:", error);
    return res.status(500).json({
      success: false,
      message: "Error while updating profile",
    });
  }
};

// ===========================================================
// ✅ Delete Profile
// ===========================================================
export const deleteProfile = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const profile = await Profile.findOneAndDelete({ user: userId });
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // Optional: Also delete user account
    // await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    console.error("Error while deleting profile:", error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting profile",
    });
  }
};

// ===========================================================
// ✅ Get All Profile Details for a User (With User Info)
// ===========================================================
export const getAllDetails = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await User.findById(userId).populate("additionalDetails"); // Assuming 'additionalDetails' stores Profile reference in User schema

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error while fetching user details:", error);
    return res.status(500).json({
      success: false,
      message: "Error while fetching user details",
    });
  }
};

// Video - 5 
