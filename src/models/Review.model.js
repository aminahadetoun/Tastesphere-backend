import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  content: String,
});

const reviewModel = mongoose.model("Review", reviewSchema);
export default reviewModel;
