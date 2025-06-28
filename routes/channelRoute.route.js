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
router.put("/:id", updateChannel);
router.get("/:id/videos", getVideosByChannel);
router.get("/", getAllChannels);
router.get("/user/:userId", getChannelByUserId); 

export default router;