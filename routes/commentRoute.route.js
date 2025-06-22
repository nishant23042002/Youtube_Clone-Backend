import express from "express";
import {
    addComment,
    getCommentsByVideo,
    deleteComment
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/", addComment);
router.get("/:videoId", getCommentsByVideo); 
router.delete("/:id", deleteComment);

export default router;
