import Recipe from "../models/Recipe.model.js";
import { generateUniqueFileName } from "../middlewares/multer.js";
import { deleteFile, uploadToCloudinary } from "../services/cloudinary.service.js";

// ✅ CREATE RECIPE
export const createRecipe = async (req, res) => {
  try {
     // Parse JSON fields manually
    if (req.body.ingredientList) {
      req.body.ingredientList = JSON.parse(req.body.ingredientList);
    }

    if (req.body.steps) {
      req.body.steps = JSON.parse(req.body.steps);
    }

    if (req.body.tags) {
      req.body.tags = JSON.parse(req.body.tags);
    }
    const newRecipe = new Recipe(req.body);
    if (!req.file) {
      return res.status(400).json({ message: "Recipe Image is required" });
    }
    const uniqueName = generateUniqueFileName("recipe", req.user.id)
    req.file.originalname = uniqueName;
    const cloudinaryResponse = await uploadToCloudinary(req.file);
    newRecipe.image = cloudinaryResponse.secure_url;
    newRecipe.image_public_id = cloudinaryResponse.public_id;
    await newRecipe.save();
    res
      .status(201)
      .json({
        status: "Successful",
        data: null
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create recipe", error });
  }
};

// ✅ GET ALL RECIPES
export const getRecipes = async (req, res) => {
  try {
    const { q, size, number, sort } = req.query;
    let query = {};

    if (q) {
      const parts = q.split(",");

      parts.forEach((pair) => {
        let [key, value] = pair.split(":");
        if (!key || !value) return;

        value = value.replace(/"/g, "");

        // Check if ID search
        if (key === "id" || key === "_id") {
          if (mongoose.Types.ObjectId.isValid(value)) {
            query["_id"] = value;
          }
          return;
        }

        // General text fields use regex
        query[key] = { $regex: value, $options: "i" };
      });
    }
    const limit = parseInt(size) || 20; // default 20
    const skip = parseInt(number) * limit || 0;

    let sortQuery = {};

    if (sort) {
      const [field, direction] = sort.split(":");
      sortQuery[field] = direction === "desc" ? -1 : 1;
    }

    const recipes = await Recipe.find(query)
      .select("-image_public_id")
      .sort(sortQuery)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      status: "Successful",
      data: recipes,
      pagination: {
        size: limit,
        number: parseInt(number) || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recipes" });
  }
};

// ✅ GET RECIPE BY ID
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).select(
      "-image_public_id"
    );
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recipe", error });
  }
};

// ✅ UPDATE RECIPE
export const updateRecipe = async (req, res) => {
  try {
    const updates = req.body;
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    if (!updatedRecipe)
      return res.status(404).json({ message: "Recipe not found" });
    res
      .status(200)
      .json({ message: "Recipe updated successfully", data: updatedRecipe });
  } catch (error) {
    res.status(500).json({ message: "Failed to update recipe", error });
  }
};

// ✅ DELETE RECIPE
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    if (recipe.image_public_id) {
      await deleteFile(recipe.image_public_id);
    }
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe)
      return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete recipe", error });
  }
};
