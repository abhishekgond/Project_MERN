import SubSection from "../models/SubSection.js";
import Section from "../models/Section.js";
import { uploadToCloudinary } from "../utils/cloudinaryUploader.js";

// ===========================================================
// ✅ Create SubSection
// ===========================================================
export const createSubSection = async (req, res) => {
  try {
    const { title, description, sectionId, timeDuration } = req.body;
    const videoFile = req.files?.videoFile; // Assuming express-fileupload

    // Validation
    if (!title || !description || !sectionId || !videoFile || !timeDuration) {
      return res.status(400).json({
        success: false,
        message: "All fields (title, description, sectionId, video, timeDuration) are required",
      });
    }

    // Upload video to Cloudinary
    const uploadResult = await uploadToCloudinary(
      videoFile.tempFilePath,
      process.env.FOLDER_NAME || "StudyPoint_Videos"
    );

    // Create SubSection
    const newSubSection = await SubSection.create({
      title,
      description,
      videoUrl: uploadResult.secure_url,
      duration: timeDuration, // Assuming your schema field is 'duration'
      section: sectionId,
    });

    // Add SubSection to Section's subSections array
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: { subSections: newSubSection._id },
      },
      { new: true }
    ).populate("subSections"); // Populate updated section's subsections

    return res.status(201).json({
      success: true,
      message: "SubSection created successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.error("Error while creating SubSection:", error);
    return res.status(500).json({
      success: false,
      message: "Error while creating SubSection",
    });
  }
};

// ===========================================================
// ✅ Update SubSection
// ===========================================================
export const updateSubSection = async (req, res) => {
  try {
    const { subSectionId, title, description, timeDuration } = req.body;
    const videoFile = req.files?.videoFile; // Optional new video

    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        message: "SubSection ID is required",
      });
    }

    // Find existing subsection
    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    // Update fields if provided
    if (title) subSection.title = title;
    if (description) subSection.description = description;
    if (timeDuration) subSection.duration = timeDuration;

    // Handle optional video update
    if (videoFile) {
      const uploadResult = await uploadToCloudinary(
        videoFile.tempFilePath,
        process.env.FOLDER_NAME || "StudyPoint_Videos"
      );
      subSection.videoUrl = uploadResult.secure_url;
    }

    await subSection.save();

    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      data: subSection,
    });
  } catch (error) {
    console.error("Error while updating SubSection:", error);
    return res.status(500).json({
      success: false,
      message: "Error while updating SubSection",
    });
  }
};

// ===========================================================
// ✅ Delete SubSection
// ===========================================================
export const deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;

    if (!subSectionId || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Both subSectionId and sectionId are required",
      });
    }

    // Delete the SubSection
    const deletedSubSection = await SubSection.findByIdAndDelete(subSectionId);
    if (!deletedSubSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    // Remove from Section's subSections array
    await Section.findByIdAndUpdate(
      sectionId,
      {
        $pull: { subSections: subSectionId },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
    });
  } catch (error) {
    console.error("Error while deleting SubSection:", error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting SubSection",
    });
  }
};
