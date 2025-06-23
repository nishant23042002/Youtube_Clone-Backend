import express from "express"
import { createChannel, getChannelById, getVideosByChannel, updateChannel } from "../controllers/channel.controller.js";


const router = express.Router();

router.post("/", createChannel);
router.get("/:id", getChannelById); 
router.put("/:id", updateChannel); 
router.get("/:id/videos", getVideosByChannel);

export default router;