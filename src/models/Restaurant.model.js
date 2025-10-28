const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema({
  name: String,
  address: String,
  rating: String,
  images: String,
  priceRange: String,
  reviews: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Review",
    },
  ],

  cuisine: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Cuisine",
    },
  ],

  social: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Social",
    },
  ],
});

const restaurantModel = mongoose.Model("Restaurant", restaurantSchema);
module.exports = restaurantModel;
