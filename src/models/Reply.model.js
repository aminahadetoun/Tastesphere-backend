import mongoose from "mongoose";

const replySchema = mongoose.Schema({
  to: {
    type: mongoose.Types.ObjectId,
    ref: "Comment",
  },

  content: String,
});

const replyModel = mongoose.model("Reply", replySchema);
export default replyModel;
