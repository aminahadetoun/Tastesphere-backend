const mongoose = require("mongoose");

const replySchema = mongoose.Schema({
  to: {
    type: mongoose.Types.ObjectId,
    ref: "Comment",
  },

  content: String,
});

const replyModel = mongoose.Model("Reply", replySchema);
module.exports = replyModel;
