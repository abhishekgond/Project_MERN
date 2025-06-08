import mongoose from "mongoose";
import mailSender from "../utils/mailSender.js";
const otpSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required for OTP"],
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Please provide a valid email"],
  },

  otp: {
    type: String,
    required: [true, "OTP is required"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60, // 5 minutes (300 seconds) - auto-delete
  },

  verified: {
    type: Boolean,
    default: false,
  },
});

// Email Sending
// async function sendVerificationEmail(email, otp) {
//   try {
//     const mailResponse = await mailSender(email, "Welcome to Learnova ", otp);
//     console.log("Email Send Successfully " + mailResponse);
//   } catch (error) {
//     console.log("Error during  sending a email: ", error);
//   }
// }

async function sendVerificationEmail(email, otp) {
  try {
    const subject = "Welcome to Learnova - Verify Your Email";

    // Tailwind-like inline styles
    const body = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #374151; padding: 1rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; color: #2563eb; margin-bottom: 0.5rem;">Welcome to Learnova!</h2>
        <p style="font-size: 1rem;">Your verification OTP is:</p>
        <h1 style="font-size: 2.5rem; letter-spacing: 0.4em; font-weight: 700; color: #1d4ed8; margin: 1rem 0;">${otp}</h1>
        <p style="font-size: 0.9rem; color: #6b7280;">This OTP will expire in 5 minutes. Please do not share it with anyone.</p>
      </div>
    `;

    const mailResponse = await mailSender(email, subject, body);
    console.log("Email sent successfully: ", mailResponse.response);
  } catch (error) {
    console.error("Error during sending an email:", error);
  }
}

// Using pre middleware to veerify before creating entry in Data Base
otpSchema.pre("save", async function (next) {
  try {
    await sendVerificationEmail(this.email, this.otp);
    next();
  } catch (error) {
    console.error("Error in OTP pre-save hook:", error);
    next(error); // Pass error to Mongoose
  }
});

const OTP = mongoose.model("OTP", otpSchema);
export default OTP;
