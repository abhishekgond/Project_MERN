import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      // required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // hide password by default
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      required: true,
      default: "", // could store Cloudinary URL or filename
    },
    accountType: {
      type: String,
      enum: ["Admin", "Instructor", "Student"],
      required: true,
      default: "Student",
    },
    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
      },
    ],
    courseProgress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseProgress",
    },

    // Optional: For reset password or email verification
    token: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

//
// 🔐 Hash password before saving
// //
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next(); // only hash if password changed
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// //
// // 🔐 Compare entered password with hashed one
// //
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

const User = mongoose.model("User", userSchema);
export default User;
