const mongoose = require("mongoose");

const cuisineSchema = mongoose.Schema({
  name: String,
  price: Number,
  ingredients: [String],
  description: String,
});

const cuisineModel = mongoose.Model("Cuisine", cuisineSchema);
module.exports = cuisineModel;
