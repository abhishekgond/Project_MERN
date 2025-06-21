import Course from "../models/Course.js";
import Tag from "../models/Tags.js";
import User from "../models/User.js";
import { uploadImageToCloudinary } from "../utils/imageaploader.js";
// creat Course Handler
export const CreateCourse = async (req, res) => {
  try {
    // Destructure fields from request body
    const { courseName, coursedescription, whatYouWillLearn, price, tag } =
      req.body;

    // Validate text fields
    if (
      !courseName ||
      !coursedescription ||
      !whatYouWillLearn ||
      !price ||
      !tag
    ) {
      return res.status(400).json({
        success: false,
        message: "All course fields are required.",
      });
    }

    // Validate price is a number
    if (isNaN(price)) {
      return res.status(400).json({
        success: false,
        message: "Price must be a number.",
      });
    }

    // Validate thumbnail image
    if (!req.files || !req.files.thumbnailimage) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail image is required.",
      });
    }

    const thumbnail = req.files.thumbnailimage;

    // Validate image type
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(thumbnail.mimetype)) {
      return res.status(400).json({
        success: false,
        message:
          "Only JPEG, PNG, JPG, or WEBP files are allowed for thumbnail.",
      });
    }

    // Validate image size (e.g., max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (thumbnail.size > MAX_SIZE) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail size should not exceed 5MB.",
      });
    }

    // check for Instructor
    const userId = req.user.id;
    const instrudtorDetails = await User.findById(userId);
    console.log("Instructor Details " + instrudtorDetails);
    if (!instrudtorDetails) {
      return res.status(400).json({
        success: false,
        message: "Instructor Details not found.",
      });
    }

    const tagDetails = await Tag.findById(tag);
    if (!tagDetails) {
      return res.status(400).json({
        success: false,
        message: "Tag not found.",
      });
    }

    // Image upload On Cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    // 1:9:00 videos - 3

    return res.status(200).json({
      success: true,
      message: "Course validated successfully. Ready for next step.",
    });
  } catch (error) {
    console.error("CreateCourse error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};
