import Section from "../models/Section.js";
import Course from "../models/Course.js";

// Create Section
export const CreateSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;

    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const newSection = await Section.create({ sectionName });

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { sections: newSection._id },
      },
      { new: true }
    ).populate({
      path: "sections",
      populate: {
        path: "subSections",
      },
    });

    return res.status(201).json({
      success: true,
      message: "Section Created Successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating section",
    });
  }
};

// Update Section
export const updateSection = async (req, res) => {
  try {
    const { sectionId, sectionName } = req.body;

    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Section Updated Successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating section",
    });
  }
};

// Delete Section
export const deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.params;

    // Find the section to get the course ID (optional, in case you want to track the course)
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // Remove the section ID from the course's 'sections' array
    await Course.updateMany(
      { sections: sectionId },
      { $pull: { sections: sectionId } }
    );

    // Delete the section
    await Section.findByIdAndDelete(sectionId);

    return res.status(200).json({
      success: true,
      message: "Section Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting section",
    });
  }
};
