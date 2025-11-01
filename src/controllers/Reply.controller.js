import Reply from "../models/Reply.model.js";
import Comment from "../models/Comment.model.js";

// ✅ CREATE REPLY
export const createReply = async (req, res) => {
  try {
    const { to, content, onModel } = req.body;

    if (!["Comment", "Reply"].includes(onModel)) {
      return res
        .status(400)
        .json({ message: "Invalid onModel value. Use 'Comment' or 'Reply'." });
    }

    // Optional: check that the target exists
    if (onModel === "Comment") {
      const commentExists = await Comment.findById(to);
      if (!commentExists)
        return res.status(404).json({ message: "Target comment not found" });
    } else if (onModel === "Reply") {
      const replyExists = await Reply.findById(to);
      if (!replyExists)
        return res.status(404).json({ message: "Target reply not found" });
    }

    const newReply = new Reply({ to, content, onModel });
    await newReply.save();

    res
      .status(201)
      .json({ message: "Reply created successfully", data: newReply });
  } catch (error) {
    res.status(500).json({ message: "Failed to create reply", error });
  }
};

// ✅ GET ALL REPLIES
export const getReplies = async (req, res) => {
  try {
    const replies = await Reply.find().populate("to");
    res.status(200).json(replies);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch replies", error });
  }
};

// ✅ GET SINGLE REPLY
export const getReplyById = async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id).populate("to");
    if (!reply) return res.status(404).json({ message: "Reply not found" });
    res.status(200).json(reply);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reply", error });
  }
};

// ✅ UPDATE REPLY
export const updateReply = async (req, res) => {
  try {
    const updates = req.body;
    const updatedReply = await Reply.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!updatedReply)
      return res.status(404).json({ message: "Reply not found" });
    res
      .status(200)
      .json({ message: "Reply updated successfully", data: updatedReply });
  } catch (error) {
    res.status(500).json({ message: "Failed to update reply", error });
  }
};

// ✅ DELETE REPLY
export const deleteReply = async (req, res) => {
  try {
    const deletedReply = await Reply.findByIdAndDelete(req.params.id);
    if (!deletedReply)
      return res.status(404).json({ message: "Reply not found" });
    res.status(200).json({ message: "Reply deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete reply", error });
  }
};
