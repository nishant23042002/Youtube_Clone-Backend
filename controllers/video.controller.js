import Video from "../models/Video.model.js"



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





export const getAllVideos = async (req, res) => {
    try {
        //listing videos on the basis of uploader and ordering in ascending
        const allVideos = await Video.find().populate("uploader", "userName").sort({ createdAt: -1 });
        return res.status(200).json({ message: "All videos based on uploader.", videosUploaded: allVideos })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}