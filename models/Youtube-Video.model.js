import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    videoFile: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnailduration: {
        type: Number,
        required: true
    },
    videoViews: {
        type: Number,
        default: 0
    },
    isAvaiable: {
        type: Boolean,
        default: true
    },
    vidoeOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true })

const Video = mongoose.model("Video", videoSchema)
export default Video