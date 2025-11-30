import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
  title: String,
  description: String,
  ingredients: [String],
  steps: [String],
  picture: String,
  tags: [String],
  cuisineType: {
    type: String,
    enum: [
      "Italian",
      "Japenese",
      "Mexican",
      "Indian",
      "French",
      "Chinese",
      "Other",
      "Thai",
      "Mediterranean",
      "American",
    ],
  },
  prepTime: Number, // in minutes
  cookTime: Number, // in minutes
  servings: Number,
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
  },
  dietaryOptions: {
    type: String,
    enum: [
      "Vegetarian",
      "Vegan",
      "Gluten-Free",
      "Dairy-Free",
      "Nut-Free",
      "None",
    ],
  },
  photo: String,
  ingredientList: {
    type: [
      {
        ingredientName: { type: String, required: true },
        amount: { type: String, required: true },
      },
    ],
    required: true,
  },
  instructions: {
    type: [String],
    required: true,
  },
  tags: [String],
},
{ timestamps: true });

const recipeModel = mongoose.model("Recipe", recipeSchema);
export default recipeModel;
