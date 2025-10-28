const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  title: String,
  ingredients: [String],
  steps: [String],
  picture: String,
  tags: [String],
});

const recipeModel = mongoose.Model("Recipe", recipeSchema);
module.exports = recipeModel;
