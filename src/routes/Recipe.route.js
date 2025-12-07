import express from "express";
import {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} from "../controllers/Recipe.controller.js";
import { upload } from "../middlewares/multer.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/",requireAuth, upload, createRecipe);
router.get("/", getRecipes);
router.get("/:id", getRecipeById);
router.patch("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

export default router;
