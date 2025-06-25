import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const isAuthenticated = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userName = await User.findById(decoded.userId).select("-password");

        if (!req.userName) {
            return res.status(401).json({ message: "User no longer exists" });
        }

        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};
