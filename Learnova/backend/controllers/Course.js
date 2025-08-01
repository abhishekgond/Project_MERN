import Course from "../models/Course.js";
import Category from "../models/Category.js";
import User from "../models/User.js";
import { uploadImageToCloudinary } from "../utils/imageaploader.js";
// creat Course Handler
export const CreateCourse = async (req, res) => {
  try {
    // Destructure fields from request body
    const { courseName, coursedescription, whatYouWillLearn, price, Category } =
      req.body;

    const thumbnail = req.files.thumbnailimage;
    s;

    // Validate text fields
    if (
      !courseName ||
      !coursedescription ||
      !whatYouWillLearn ||
      !price ||
      !Category
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
    // TODo : Is There User id and Instructor id are Same
    const userId = req.user.id;
    const instrudtorDetails = await User.findById(userId);
    console.log("Instructor Details " + instrudtorDetails);
    if (!instrudtorDetails) {
      return res.status(400).json({
        success: false,
        message: "Instructor Details not found.",
      });
    }

    const CategoryDetails = await Category.findById(Category);
    if (!CategoryDetails) {
      return res.status(400).json({
        success: false,
        message: "Category not found.",
      });
    }

    // Image upload On Cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // Create new Entry for new Course
    const newCourse = await Course.create({
      courseName,
      coursedescription,
      thumbnailimage: thumbnailImage.secure_url,
      instructor: instrudtorDetails._id,
      whatYouWillLearn,
      price,
      Category: CategoryDetails._id,
    });
    // add new Course in instructor Schema
    await User.findByIdAndUpdate(
      { _id: instrudtorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    // Update Category Schema
    await Category.findByIdAndUpdate(
      { _id: CategoryDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course Created successfully. Ready for next step.",
      data: newCourse,
    });
  } catch (error) {
    console.error("CreateCourse error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

// Get allCourse
exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnailimage: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();
    return res.status(200).json({
      success: true,
      message: "Courses Retrieved successfully.",
      data: allCourses,
    });
  } catch (error) {
    console.log("get all Course error " + error);
    return res.status(500).json({
      success: false,
      message: "Can Not Fetch all Course ",
      error: error.message,
    });
  }
};

// Creating sections
