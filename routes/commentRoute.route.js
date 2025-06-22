import express from "express"
import { userComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/", userComment)

export default router;