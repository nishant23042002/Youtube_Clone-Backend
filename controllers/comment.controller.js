import Comment from "../models/Comment.model.js"


// 1. ADD A COMMENT
export const addComment = async (req, res) => {
    try {
        let { text } = req.body;
        const userId = req.userName._id;
        const videoId = req.params.videoId;
        if (!videoId || !text) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newComment = await Comment.create({ videoId, userId, text })

        if (!newComment) {
            res.status(404).json({ message: "No comments on this video!!!" })
        }
        res.status(201).json({ message: "comment added successfully", comment: newComment })
    } catch (error) {
        return res.status(500).json({
            message: "Error adding comment",
            error: error.message || "Unknown error"
        });
    }
}


// 2. GET ALL COMMENTS FOR A VIDEO
export const getCommentsByVideo = async (req, res) => {
    try {
        let { videoId } = req.params;
        const allComments = await Comment.find({ videoId }).populate("userId", "userName profilePicture").sort({ createdAt: -1 })
        if (!allComments) {
            res.status(404).json({ message: "No comments on this video!!!" })
        }
        return res.status(202).json({ message: "All users comments", allUserComments: allComments });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching comments", error: error });
    }
}


// 3. DELETE A COMMENT
export const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const userId = req.userName._id;


        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Optional: ensure user is the owner of the comment
        if (comment.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You can only delete your own comments" });
        }

        await Comment.findByIdAndDelete(commentId);
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


export const editComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const userId = req.userName._id;
        const { text } = req.body;

        if (!text?.trim()) {
            return res.status(400).json({ message: "Comment text cannot be empty" });
        }

        const comment = await Comment.findById(commentId);
        if (!comment) return res.status(404).json({ message: "Comment not found" });

        if (comment.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You can only edit your own comment" });
        }

        comment.text = text;
        await comment.save();

        return res.status(200).json({ message: "Comment updated", comment });
    } catch (err) {
        return res.status(500).json({ message: "Failed to edit comment", error: err.message });
    }
};
