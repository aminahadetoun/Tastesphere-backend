const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  content: String,
});

const reviewModel = mongoose.Model("Review", reviewSchema);
module.exports = reviewModel;
