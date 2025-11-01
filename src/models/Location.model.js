import mongoose from "mongoose";

const locationSchema = mongoose.Schema({
  name: String,
  restaurant_id: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Restaurant",
    },
  ],
});

const locationModel = mongoose.model("Location", locationSchema);
export default locationModel;
