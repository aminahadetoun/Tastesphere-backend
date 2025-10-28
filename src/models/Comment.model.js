const mongoose = require("mongoose");

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

const commentModel = mongoose.Model("Comment", commentSchema);
module.exports = commentModel;
