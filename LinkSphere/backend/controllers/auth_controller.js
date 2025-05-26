import jwt from "jsonwebtoken";
import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, userName, password } = req.body;

    // 1. Check if user already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }
    //2. Check User Exist Or Not
    const existUser = await User.findOne({ userName });
    if (existUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    // 2. Hash password
    const isStrongPassword = (password) => {
      const strongRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
      return strongRegex.test(password);
    };
    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create new user
    const user = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
    });

    // 4. Generate JWT token
    const token = genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // mili second
      sameSite: "strict",
      secure: process.env.NODE_ENVIRONMENT === "production",
    });
    // 5. Respond with user and token
    return res.status(201).json({ user });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body; // identifier can be email or username

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user by email or username
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = await genToken(user._id);
    // console.log("Token ", token);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // mili second
      sameSite: "strict",
      secure: process.env.NODE_ENVIRONMENT === "production",
    });
    // Send response
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    // res.clearCookie("token", {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENVIRONMENT === "production",
    //   sameSite: "strict",
    // });
    res
      .status(200)
      .json({ message: "Logged out successfully. Cookie cleared." });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};
