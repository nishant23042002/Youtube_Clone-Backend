import express from "express";
import {
    addComment,
    getCommentsByVideo,
    deleteComment,
    deleteAllComment,
    editComment
} from "../controllers/comment.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js"

const router = express.Router();


router.post("/:videoId", isAuthenticated, addComment);
router.get("/:videoId", getCommentsByVideo);
router.delete("/:id", isAuthenticated, deleteComment);
router.delete("/", deleteAllComment);
router.put("/:id", isAuthenticated, editComment);


export default router;
