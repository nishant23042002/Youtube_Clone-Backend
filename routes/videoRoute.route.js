import express from "express"
import { createVideo, deleteVideo, getAllVideos, getVideoById, updateVideo } from "../controllers/video.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();




router.post("/", createVideo)
router.put("/:id",isAuthenticated, updateVideo);
router.delete("/:id", deleteVideo);
router.get("/", getAllVideos)
router.get("/:id", getVideoById);

export default router;