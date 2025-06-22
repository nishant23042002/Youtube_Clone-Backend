import express from "express"
import { createChannel, getChannelById, getVideosByChannel, updateChannel } from "../controllers/channel.controller.js";


const router = express.Router();

router.post("/", createChannel);
router.get("/:id", getChannelById); // GET /api/channels/:id
router.put("/:id", updateChannel); // PUT /api/channels/:id
router.get("/:id/videos", getVideosByChannel); // GET /api/channels/:id/videos

export default router;