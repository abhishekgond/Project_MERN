import mongoose from "mongoose";

const subSectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // required: [true, "Title is required"],
      trim: true,
    },

    description: {
      type: String,
      // required: [true, "Description is required"],
      trim: true,
    },

    videoUrl: {
      type: String,
      // required: [true, "Video URL is required"],
    },

    timeDuration: {
      type: String,
      // required: [true, "Duration is required"], // e.g. "5:30"
    },

    // Optional: reference to parent section
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section", // If you have a Section model
    },
  },
  {
    timestamps: true,
  }
);

const SubSection = mongoose.model("SubSection", subSectionSchema);
export default SubSection;
