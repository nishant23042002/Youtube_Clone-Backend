import express from "express"
import { createChannel, getAllChannels, getChannelById, getVideosByChannel, updateChannel, getChannelByUserId } from "../controllers/channel.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/", upload.fields([
    {
        name: "profilePicture",
        maxCount: 1
    }
]), createChannel);
router.get("/:id", getChannelById);
router.get("/:id/videos", getVideosByChannel);
router.get("/user/:userId", getChannelByUserId); 

// to be removed before submission
router.get("/", getAllChannels);

export default router;