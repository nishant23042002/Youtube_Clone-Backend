import Channel from "../models/Channel.model.js"
import Video from "../models/Video.model.js"
import { uploadCloudinary } from "../utils/cloudinary.service.js";

// 1. CREATE A NEW CHANNEL
export const createChannel = async (req, res) => {
    try {
        let { name, description, owner } = req.body;
        if (!name || !owner) {
            return res.status(400).json({ error: "Name and owner are required" });
        }

        const profilePic_URL = req.files?.profilePicture?.[0];
        const localPath = profilePic_URL?.path;
        if (!profilePic_URL) {
            return res.status(400).json({ message: "Please upload Profile Picture" });
        }

        const profilePic = await uploadCloudinary(localPath)
        if (!profilePic || !profilePic.url) {
            return res.status(400).json({ message: "Profile picture upload failed." });
        }


        const existing = await Channel.findOne({ owner });
        if (existing) {
            return res.status(400).json({ error: "User already has a channel" });
        }

        const newChannel = await Channel.create({ name, description, owner, profilePicture: profilePic.url })

        return res.status(201).json({ message: "Channel created successfully", channel: newChannel });
    } catch (error) {
        console.error("Create channel error:", error);
        return res.status(500).json({ message: "Unable to create a channel", error: error.message });
    }
}



// 2. GET CHANNEL BY ID
export const getChannelById = async (req, res) => {
    try {
        let { id } = req.params;
        const channel = await Channel.findById(id).populate("owner", "userName");
        if (!channel) {
            return res.status(404).json({ error: "Channel not found" });
        }

        return res.status(200).json({ message: "Channel searched successfully", channelById: channel });
    } catch (error) {
        return res.status(500).json({ message: "Failed to get the Channel", error: error.message });
    }
}



// 3. UPDATE CHANNEL
export const updateChannel = async (req, res) => {
    try {
        let { id } = req.params;
        const updates = req.body;

        const updatedChannel = await Channel.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedChannel) {
            return res.status(404).json({ error: "Channel not found" });
        }

        return res.status(200).json({ message: "Channel updated", channel: updatedChannel });
    } catch (error) {
        return res.status(500).json({ message: "Failed to update the channel", error: error.message });
    }
}



// 4. GET ALL VIDEOS BY CHANNEL
export const getVideosByChannel = async (req, res) => {
    try {
        const { id } = req.params; // channelId

        const videos = await Video.find({ channelId: id }).populate("uploader", "userName");

        return res.status(200).json({ message: "Videos of my channel", videos: videos });
    } catch (error) {
        return res.status(500).json({ message: "", error: error.message });
    }
}

