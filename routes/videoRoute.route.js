import express from "express"
import { createVideo, deleteVideoByOwner, getAllVideos, getVideoById } from "../controllers/video.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js"

const router = express.Router();

router.post("/", upload.fields([
    { name: "thumbnail", maxCount: 1 }
]), createVideo)
router.delete("/:videoId", isAuthenticated, deleteVideoByOwner);
router.get("/", getAllVideos)
router.get("/:id", getVideoById);

export default router;