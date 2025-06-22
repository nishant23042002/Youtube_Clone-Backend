import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profilePicture: {
        type: String,
        required: [true, "Please select a Profile Picture!!"]
    },
    watchTime: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    },
    password: {
        type: String,
        required: [true, "Password is required!!"],
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema)

export default User