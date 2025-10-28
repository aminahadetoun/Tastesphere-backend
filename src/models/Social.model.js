const mongoose = require("mongoose");
const restaurantModel = require("./Restaurant.model");

const socialSchema = mongoose.Schema({
  link: String,
  restaurant: {
    type: mongoose.Types.ObjectId,
    ref: "Restaurant",
  },
});

const socialModel = mongoose.Model("Social", socialSchema);
module.exports = socialModel;
