import { v4 as uuidv4 } from "uuid";
import User from "../models/User.js";
import sendEmail from "../utils/mailSender.js";
import bcrypt from "bcrypt";

export const ResetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email presence and format
    if (!email || typeof email !== "string") {
      return res.status(400).json({
        success: false,
        message: "Valid email is required",
      });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const user = await User.findOne({ email: trimmedEmail });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate token (UUID) and set expiry (5 minutes)
    const resetToken = uuidv4();
    user.token = resetToken;
    user.resetPasswordExpires = Date.now() + 5 * 60 * 1000;
    await user.save();

    const resetUrl = `${process.env.RESET_URL}?token=${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <p>You requested to reset your password.</p>
        <p>Click the link below to reset it (expires in 5 minutes):</p>
        <a href="${resetUrl}" target="_blank">${resetUrl}</a>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    };

    await sendEmail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.error("Reset password error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, token } = req.body;

    // 1. Validate token presence and format
    if (!token || typeof token !== "string") {
      return res.status(400).json({
        success: false,
        message: "A valid token is required.",
      });
    }

    // 2. Validate both passwords are provided
    if (!newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Both new password and confirm password are required.",
      });
    }

    // 3. Validate passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    // 4. Validate password strength
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long and include at least one letter and one number.",
      });
    }

    // 5. Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 6. Use findOneAndUpdate to update password and clear reset fields
    const updatedUser = await User.findOneAndUpdate(
      {
        token, // Replace with tokenHash if token is hashed
        resetPasswordExpires: { $gt: Date.now() },
      },
      {
        password: hashedPassword,
        token: undefined,
        resetPasswordExpires: undefined,
      },
      {
        new: true,
      }
    );

    console.log("Updated User is : " + updatedUser);

    if (!updatedUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password has been reset successfully.",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while resetting password.",
    });
  }
};
