import mongoose from "mongoose";

const restaurantSchema = mongoose.Schema({
  name: String,
  description: String,
  cuisineType: {
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
      "vietnamese",
    ],
  },
  address: String,
  phoneNumber: String,
  operatingHours: String,
  images: [String],
  featuresAndAmenities: [String],
  rating: String,
  priceRange: String,
  reviews: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Review",
    },
  ],

  // cuisine: [
  //   {
  //     type: mongoose.Types.ObjectId,
  //     ref: "Cuisine",
  //   },
  // ],

  social: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Social",
    },
    { timestamps: true },
  ],
});

const restaurantModel = mongoose.model("Restaurant", restaurantSchema);
export default restaurantModel;
