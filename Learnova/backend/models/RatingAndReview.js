import mongoose from "mongoose";

const ratingAndReviewSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },

    review: {
      type: String,
      trim: true,
      maxlength: [1000, "Review can't exceed 1000 characters"],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate review from the same user for the same course
ratingAndReviewSchema.index({ course: 1, user: 1 }, { unique: true });

const RatingAndReview = mongoose.model(
  "RatingAndReview",
  ratingAndReviewSchema
);
export default RatingAndReview;
