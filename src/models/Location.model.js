const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  name: String,
  restaurant_id: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Restaurant",
    },
  ],
});

const locationModel = mongoose.Model("Location", locationSchema);
module.exports = locationModel;
