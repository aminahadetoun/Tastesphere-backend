import mongose from "mongoose";

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

const messageModel = mongoose.model("Message", messageSchema);
export default messageModel;
