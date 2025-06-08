// models/CourseProgress.js
import mongoose from "mongoose";

const courseProgressSchema = new mongoose.Schema({
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  completedLectures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSections", // optional if you define lecture model
    },
  ],
  progressPercentage: {
    type: Number,
    default: 0,
  },
});

const CourseProgress = mongoose.model("courseProgress", courseProgressSchema);
export default CourseProgress;
