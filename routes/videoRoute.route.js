import express from "express"
import { createVideo, deleteVideoByOwner, getAllVideos, getVideoById, updateVideo } from "../controllers/video.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post("/", createVideo)
router.put("/:id", isAuthenticated, updateVideo); // to be removed before submission
router.delete("/:videoId", isAuthenticated, deleteVideoByOwner);
router.get("/", getAllVideos)
router.get("/:id", getVideoById); // to be removed before submission

export default router;