import mongoose from "mongoose";

const cuisineSchema = mongoose.Schema({
  name: String,
  price: Number,
  ingredients: [String],
  description: String,
});

const cuisineModel = mongoose.model("Cuisine", cuisineSchema);
export default cuisineModel;
