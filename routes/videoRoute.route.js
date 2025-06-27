import express from "express"
import { createVideo, deleteVideo, getAllVideos, updateVideo } from "../controllers/video.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();




router.post("/", createVideo)
router.put("/:id",isAuthenticated, updateVideo);
router.delete("/:id",isAuthenticated, deleteVideo);
router.get("/", getAllVideos)

export default router;