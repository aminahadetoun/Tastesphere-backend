import mongoose from "mongoose";

const recipeSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    steps: [String],
    image: {
      type: String,
      default: null
    },
    image_public_id: {
      type: String,
      default: null
    },
    tags: [String],
    cuisine: {
      type: String,
      enum: [
        "Italian",
        "Japanese",
        "Mexican",
        "Indian",
        "French",
        "Chinese",
        "Other",
        "Thai",
        "Mediterranean",
        "American",
        "Greek",
        "Spanish",
        "Middle Eastern",
      ],
    },
    prepTime: String, // in minutes
    cookTime: String, // in minutes
    servings: String,
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
      // required: true,
      default: null,
    },
    tags: [String],
  },
  { timestamps: true }
);

const recipeModel = mongoose.model("Recipe", recipeSchema);
export default recipeModel;
