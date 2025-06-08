import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },

    coursedescription: {
      type: String,
      required: [true, "Course description is required"],
    },

    thumbnail: {
      type: String,
      required: [true, "Course thumbnail is required"],
    },

    price: {
      type: Number,
      required: [true, "Course price is required"],
    },

    category: {
      type: String,
      required: [true, "Course category is required"],
    },

    language: {
      type: String,
      default: "English",
    },
    courseContent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
      },
    ],
    whatYouWillLearn: {
      type: String,
      required: [true, "This field is required"],
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tag: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],

    studentsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],

    ratingAndReviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReview",
      },
    ],

    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
