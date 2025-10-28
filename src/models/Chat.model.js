const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  client_1: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },

  client_2: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },

  messages: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Message",
    },
  ],
});

const chatModel = mongoose.Model("Chat", chatSchema);
module.exports = chatModel;
