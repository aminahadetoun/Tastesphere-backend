import Comment from "../models/Comment.model.js";
import Recipe from "../models/Recipe.model.js";

// ✅ CREATE COMMENT
export const createComment = async (req, res) => {
  try {
    const { recipe, content } = req.body;

    // Ensure recipe exists
    const recipeExists = await Recipe.findById(recipe);
    if (!recipeExists)
      return res.status(404).json({ message: "Recipe not found" });

    const newComment = new Comment({ recipe, content });
    await newComment.save();

    res
      .status(201)
      .json({ message: "Comment created successfully", data: newComment });
  } catch (error) {
    res.status(500).json({ message: "Failed to create comment", error });
  }
};

// ✅ GET ALL COMMENTS (optional filter by recipe)
export const getComments = async (req, res) => {
  try {
    const { recipeId } = req.query;
    const filter = recipeId ? { recipe: recipeId } : {};

    const comments = await Comment.find(filter)
      .populate("recipe", "title")
      .populate("reply");
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments", error });
  }
};

// ✅ GET SINGLE COMMENT BY ID
export const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate("recipe", "title")
      .populate("reply");

    if (!comment) return res.status(404).json({ message: "Comment not found" });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comment", error });
  }
};

// ✅ ADD A REPLY TO COMMENT
export const addReply = async (req, res) => {
  try {
    const { parentCommentId } = req.params;
    const { content } = req.body;

    const parentComment = await Comment.findById(parentCommentId);
    if (!parentComment)
      return res.status(404).json({ message: "Parent comment not found" });

    const replyComment = new Comment({
      recipe: parentComment.recipe,
      content,
    });

    await replyComment.save();

    // Link reply
    parentComment.reply.push(replyComment._id);
    await parentComment.save();

    res
      .status(201)
      .json({ message: "Reply added successfully", data: replyComment });
  } catch (error) {
    res.status(500).json({ message: "Failed to add reply", error });
  }
};

// ✅ UPDATE COMMENT
export const updateComment = async (req, res) => {
  try {
    const updates = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    if (!updatedComment)
      return res.status(404).json({ message: "Comment not found" });
    res
      .status(200)
      .json({ message: "Comment updated successfully", data: updatedComment });
  } catch (error) {
    res.status(500).json({ message: "Failed to update comment", error });
  }
};

// ✅ DELETE COMMENT
export const deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment)
      return res.status(404).json({ message: "Comment not found" });
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete comment", error });
  }
};
