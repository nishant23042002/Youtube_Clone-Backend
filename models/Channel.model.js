import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Assuming each channel has a unique name
    },
    description: {
        type: String,
        default: "",
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true, // One user = one channel
    },
    subscribers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    profilePicture: {
        type: String,
        default: "", // Optional: link to channel profile image
    },
    totalVideos: {
        type: Number,
        default: 0,
    },
    totalViews: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });


const Channel = mongoose.model("Channel", channelSchema);
export default Channel;
