import express from "express";
import {
  createComment,
  getComments,
  getCommentById,
  addReply,
  updateComment,
  deleteComment,
} from "../controllers/Comment.controller.js";

const router = express.Router();

router.post("/", createComment);
router.get("/", getComments);
router.get("/:id", getCommentById);
router.post("/:parentCommentId/reply", addReply);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
