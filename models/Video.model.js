import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail: {
        type: String,
        default: ""
    },
    videoFile: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    channelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
        required: true
    },
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    disLikes: {
        type: Number,
        default: 0
    },
    thumbnailduration: {
        type: Number,
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    isAvailable: {
        type: Boolean,
        default: true
    }

}, { timestamps: true })

const Video = mongoose.model("Video", videoSchema)
export default Video