import mongoose from "mongoose";
const restaurantModel = require("./Restaurant.model.js");

const socialSchema = mongoose.Schema({
  link: String,
  restaurant: {
    type: mongoose.Types.ObjectId,
    ref: "Restaurant",
  },
});

const socialModel = mongoose.model("Social", socialSchema);
export default socialModel;
