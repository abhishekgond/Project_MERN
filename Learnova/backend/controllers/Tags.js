import Tag from "../models/Tags.js";

// Create Tag Controller
export const createTag = async (req, res) => {
  try {
    // Trim and extract data
    const name = req.body.name?.trim();
    const description = req.body.description?.trim();

    // Validation
    if (!name || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check for duplicate tag
    const existingTag = await Tag.findOne({ name });
    if (existingTag) {
      return res.status(409).json({ message: "Tag already exists." });
    }

    // Create tag
    const tag = await Tag.create({ name, description });
    console.log("Tag Created:", tag);

    // Respond
    res.status(201).json({ message: "Tag created successfully", tag });
  } catch (error) {
    console.error("Error in createTag:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Show All Tags Controller
export const showAllTags = async (req, res) => {
  try {
    // Fetch tags with projection
    const tags = await Tag.find({}, { name: 1, description: 1 });

    // Respond
    res.status(200).json({ message: "Tags fetched successfully", tags });
  } catch (error) {
    console.error("Error in showAllTags:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
