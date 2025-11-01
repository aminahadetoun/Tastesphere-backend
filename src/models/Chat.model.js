import mongoose from "mongoose";

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

const chatModel = mongoose.model("Chat", chatSchema);
export default chatModel;
