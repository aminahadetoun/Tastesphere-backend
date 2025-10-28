const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  from: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },

  to: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },

  content: String,
});

const messageModel = mongoose.Model("Message", messageSchema);
module.exports = messageModel;
