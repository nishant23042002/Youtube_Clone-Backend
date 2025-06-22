import express from "express"
import { createVideo, getAllVideos } from "../controllers/Video.controller.js";

const router = express.Router();




router.post("/", createVideo)
router.get("/", getAllVideos)

export default router;