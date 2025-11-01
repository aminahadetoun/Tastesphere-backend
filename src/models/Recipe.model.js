import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
  title: String,
  ingredients: [String],
  steps: [String],
  picture: String,
  tags: [String],
});

const recipeModel = mongoose.model("Recipe", recipeSchema);
export default recipeModel;
