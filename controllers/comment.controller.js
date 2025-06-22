import Comment from "../models/Comment.model.js"


// 1. ADD A COMMENT
export const addComment = async (req, res) => {
    try {
        let { videoId, userId, text } = req.body;
        if (!videoId || !userId || !text) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newComment = await Comment.create({ videoId, userId, text })
        if (!newComment) {
            res.status(404).json({ message: "No comments on this video!!!" })
        }
        res.status(201).json({ message: "comment added successfully", comment: newComment })
    } catch (error) {
        return res.status(500).json({ message: "Error adding comment", error: error })
    }
}


// 2. GET ALL COMMENTS FOR A VIDEO
export const getCommentsByVideo = async (req, res) => {
    try {
        let { videoId } = req.params;
        const allComments = await Comment.find({ videoId }).populate("userId", "userName").sort({ createdAt: -1 })
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
        const { id } = req.params;

        const deleted = await Comment.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ error: "Comment not found" });
        }

        return res.status(200).json({ message: "Comment deleted", deletedComment: deleted });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}