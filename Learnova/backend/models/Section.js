import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    sectionName: {
      type: String,
      required: [true, "Section title is required"],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    subSections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "SubSection",
      },
    ],

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Section = mongoose.model("Section", sectionSchema);
export default Section;
