import Category from "../models/Category.js";

// Create Category Controller
export const createCategory = async (req, res) => {
  try {
    // Trim and extract data
    const name = req.body.name?.trim();
    const description = req.body.description?.trim();

    // Validation
    if (!name || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check for duplicate Category
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(409).json({ message: "Category already exists." });
    }

    // Create Category
    const Category = await Category.create({ name, description });
    console.log("Category Created:", Category);

    // Respond
    res.status(201).json({ message: "Category created successfully", Category });
  } catch (error) {
    console.error("Error in createCategory:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Show All Categorys Controller
export const showAllCategory = async (req, res) => {
  try {
    // Fetch Categorys with projection
    const Categorys = await Category.find({}, { name: 1, description: 1 });

    // Respond
    res.status(200).json({ message: "Categorys fetched successfully", Categorys });
  } catch (error) {
    console.error("Error in showAllCategorys:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
