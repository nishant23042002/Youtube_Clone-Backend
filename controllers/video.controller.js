import Video from "../models/Video.model.js"
import Channel from "../models/Channel.model.js";




export const createVideo = async (req, res) => {
    try {
        let {
            title,
            thumbnail,
            videoFile,
            description,
            channelId,
            uploader,
            thumbnailduration,
            uploadDate
        } = req.body;

        if (!title || !videoFile || !description || !channelId || !uploader || !thumbnailduration) {
            return res.status(400).json({ error: "Missing required fields" });
        }
     
        const newVideo = await Video.create({
            title,
            thumbnail,
            videoFile,
            description,
            channelId,
            uploader,
            thumbnailduration,
            uploadDate
        })
        if (!newVideo) {
            return res.status(500).json({ message: "Failed to upload video" });
        }

        return res.status(201).json({ message: "New Video Uploaded Successfully.", video: newVideo })
    } catch (error) {
        return res.status(400).json({ message: "Something went wrong !!!", error })
    }
}


// to be removed before submission
// Update video
export const updateVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const video = await Video.findById(id);
        if (!video) return res.status(404).json({ message: "Video not found" });

        if (video.uploader.toString() !== req.user.userId)
            return res.status(403).json({ message: "Unauthorized to update this video" });

        video.title = title || video.title;
        video.description = description || video.description;

        await video.save();
        res.status(200).json({ message: "Video updated", video });
    } catch (error) {
        res.status(500).json({ message: "Failed to update video", error: error.message });
    }
};


// DELETE a video by videoId only (must belong to channel owned by the user)
export const deleteVideoByOwner = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.userName._id; 

    // Find the channel of the logged-in user
    const channel = await Channel.findOne({ owner: userId });
    if (!channel) {
      return res.status(404).json({ message: "Channel not found for this user" });
    }

    // Check if the video belongs to the user's channel
    const video = await Video.findOne({ _id: videoId, channelId: channel._id });
    if (!video) {
      return res.status(403).json({ message: "Unauthorized: Video does not belong to your channel" });
    }

    await Video.findByIdAndDelete(videoId);

    return res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete video", error: error.message });
  }
};




export const getAllVideos = async (req, res) => {
    try {
        //listing videos on the basis of uploader and ordering in ascending
        const allVideos = await Video.find().populate("channelId").sort({ createdAt: -1 });
        return res.status(200).json({ message: "All videos based on uploader.", videos: allVideos })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

// to be removed before submission
export const getVideoById = async (req, res) => {
    try {
        let { id } = req.params;
        const video = await Video.findById(id).populate("channelId");
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }
        res.status(200).json({ video });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};