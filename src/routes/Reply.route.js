import express from "express";
import {
  createReply,
  getReplies,
  getReplyById,
  updateReply,
  deleteReply,
} from "../controllers/Reply.controller.js";

const router = express.Router();

router.post("/", createReply);
router.get("/", getReplies);
router.get("/:id", getReplyById);
router.put("/:id", updateReply);
router.delete("/:id", deleteReply);

export default router;
