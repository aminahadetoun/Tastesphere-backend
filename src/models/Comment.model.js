import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  recipe: {
    type: mongoose.Types.ObjectId,
    ref: "Recipe",
  },

  content: String,
  reply: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Reply",
    },
  ],
});

const commentModel = mongoose.model("Comment", commentSchema);
export default commentModel;
