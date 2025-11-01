import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
  firstLine: String,
  streetAddress: String,
  city: String,
  state: String,
  country: String,
});

const addressModel = mongoose.model("Address", addressSchema);
export default addressModel;
