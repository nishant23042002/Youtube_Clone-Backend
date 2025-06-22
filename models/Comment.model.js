import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    commentId: {
        type: String,
        required: true,
        unique: true,
    },
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
    isEdited: {
        type: Boolean,
        default: false,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });


const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
