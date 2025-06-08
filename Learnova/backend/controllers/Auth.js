import OTP from "../models/Otp.js";
import Profile from "../models/profile.js";
import User from "../models/User.js";
import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Check if email exists
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // 2. Check if it's a string
    if (typeof email !== "string") {
      return res.status(400).json({
        success: false,
        message: "Email must be a string",
      });
    }

    // 3. Trim and lowercase for consistency
    const trimmedEmail = email.trim().toLowerCase();

    // 4. Regex format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // 5. Optional: block certain domains (e.g., temporary emails)
    const blockedDomains = ["tempmail.com", "10minutemail.com"];
    const emailDomain = trimmedEmail.split("@")[1];
    if (blockedDomains.includes(emailDomain)) {
      return res.status(400).json({
        success: false,
        message: "Disposable email addresses are not allowed",
      });
    }

    // 6. Check if user already exists
    const userExists = await User.findOne({ email: trimmedEmail });
    if (userExists) {
      return res.status(409).json({
        success: false,
        message: "User already registered",
      });
    }

    // 7. Delete old OTPs for the same email
    await OTP.deleteMany({ email: trimmedEmail });

    // 8. Generate OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      alphabets: false,
    });

    // 9. Save OTP
    const otpEntry = await OTP.create({ email: trimmedEmail, otp });

    console.log("OTP Entry Saved:", otpEntry);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp, // ⚠️ For testing; remove in production
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while generating OTP",
    });
  }
};

const OTP_EXPIRY_MINUTES = 10;
export const signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contectNumber,
      otp,
    } = req.body;

    // 1. Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // 2. Check password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password do not match",
      });
    }

    // 3. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedEmail = email.trim().toLowerCase();
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // 4. Optional: validate phone number format
    if (contectNumber && !/^\d{10}$/.test(contectNumber)) {
      return res.status(400).json({
        success: false,
        message: "Contact number must be a valid 10-digit number",
      });
    }

    // 5. Check if user already exists
    const existingUser = await User.findOne({ email: trimmedEmail });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // 6. Find latest OTP
    const recentOtpEntry = await OTP.findOne({ email: trimmedEmail })
      .sort({ createdAt: -1 })
      .exec();

    if (!recentOtpEntry) {
      return res.status(400).json({
        success: false,
        message: "OTP not found. Please request a new one.",
      });
    }

    // 7. Check if OTP matches
    if (recentOtpEntry.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // 8. Check if OTP is expired
    const now = new Date();
    const otpAgeMinutes =
      (now.getTime() - new Date(recentOtpEntry.createdAt).getTime()) /
      (1000 * 60);
    if (otpAgeMinutes > OTP_EXPIRY_MINUTES) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    // 9. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const profileDetails = await Profile.create({
      gender: null,
      contactNo: null,
      dateOfBirth: null,
      about: null,
      education: null,
      experience: null,
      skills: null,
      address: null,
      linkedin: null,
      github: null,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${
        firstName + " " + lastName
      }`,
    });
    // 10. Create user Entry in The DB
    const newUser = await User.create({
      firstName,
      lastName,
      email: trimmedEmail,
      password: hashedPassword,
      accountType: accountType || "student",
      contectNumber,
      additionalDetails: profileDetails._id,
      isVerified: true,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.firstName + " " + newUser.lastName,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during signup please Try Again ",
    });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate presence of email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2. Normalize email (trim + lowercase)
    const normalizedEmail = email.trim().toLowerCase();

    // 3. Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // 4. Fetch user from DB
    const user = await User.findOne({ email: normalizedEmail }).populate(
      "additionalDetails"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with this email",
      });
    }

    // 5. Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // 6. Generate JWT token
    const payload = {
      id: user._id,
      email: user.email,
      accountType: user.accountType,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // 7. Prepare cookie options
    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict",
    };

    // 8. Remove password before sending user object
    user.password = undefined;

    // 9. Send response with token
    res.cookie("token", token, cookieOptions).status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { email } = req.user; // Ensure middleware sets `req.user.email`
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // 1. Validate all inputs
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All password fields are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters long",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    // 2. Find user by email
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 3. Validate old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    // 4. Update with new hashed password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during password change",
    });
  }
};

// 47:18
