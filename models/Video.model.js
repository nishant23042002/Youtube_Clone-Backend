import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
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
        ref: 'Channel'
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
        required: true
    },
    isAvaiable: {
        type: Boolean,
        default: true
    }

}, { timestamps: true })

const Video = mongoose.model("Video", videoSchema)
export default Video