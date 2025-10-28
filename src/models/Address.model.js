const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  firstLine: String,
  streetAddress: String,
  city: String,
  state: String,
  country: String,
});

const addressModel = mongoose.Model("Address", addressSchema);
module.exports = addressModel;
