import Cuisine from "../models/Cuisine.model.js";

// ✅ CREATE CUISINE
export const createCuisine = async (req, res) => {
  try {
    const { name, price, ingredients, description } = req.body;

    const newCuisine = new Cuisine({
      name,
      price,
      ingredients,
      description,
    });

    await newCuisine.save();
    res.status(201).json(newCuisine);
  } catch (error) {
    res.status(500).json({ message: "Failed to create cuisine", error });
  }
};

// ✅ GET ALL CUISINES
export const getCuisines = async (req, res) => {
  try {
    const cuisines = await Cuisine.find();
    res.status(200).json(cuisines);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cuisines", error });
  }
};

// ✅ GET SINGLE CUISINE BY ID
export const getCuisineById = async (req, res) => {
  try {
    const cuisine = await Cuisine.findById(req.params.id);
    if (!cuisine) return res.status(404).json({ message: "Cuisine not found" });
    res.status(200).json(cuisine);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cuisine", error });
  }
};

// ✅ UPDATE CUISINE
export const updateCuisine = async (req, res) => {
  try {
    const updates = req.body;
    const updatedCuisine = await Cuisine.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    if (!updatedCuisine)
      return res.status(404).json({ message: "Cuisine not found" });
    res.status(200).json(updatedCuisine);
  } catch (error) {
    res.status(500).json({ message: "Failed to update cuisine", error });
  }
};

// ✅ DELETE CUISINE
export const deleteCuisine = async (req, res) => {
  try {
    const deletedCuisine = await Cuisine.findByIdAndDelete(req.params.id);
    if (!deletedCuisine)
      return res.status(404).json({ message: "Cuisine not found" });
    res.status(200).json({ message: "Cuisine deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete cuisine", error });
  }
};
