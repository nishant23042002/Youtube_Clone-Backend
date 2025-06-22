import User from "../models/User.model.js"
import { uploadCloudinary } from "../utils/cloudinary.service.js";


export const registerUser = async (req, res) => {
    try {
        console.log("Files:", req.files);

        let { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return res.send(401).json({ message: "Please provide valid Information..." })
        }

        //checking if email already exists in the DB
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists" });
        }

        const profilePic_URL = req.files?.profilePicture?.[0];
        const localPath = profilePic_URL?.path;
        if (!profilePic_URL) {
            res.status(400).json({ message: "Please upload Profile Picture" });
        }
        // check
        if (!localPath || typeof localPath !== "string") {
            return res.status(400).json({ message: "Invalid file path" });
        }

        const profilePic = await uploadCloudinary(localPath)
        console.log(profilePic);
        if (!profilePic || !profilePic.url) {
            return res.status(400).json({ message: "Profile picture upload failed." });
        }

        const newUser = await User.create({
            userName,
            email,
            profilePicture: profilePic.url,
            password
        });

        if (!newUser) {
            res.status(400).json({ message: "Something went wrong while registering the user" })
        }

        const token = newUser.generateAccessToken();
        return res.status(201).json({
            message: "User registered",
            token,
            registeredUser: {
                userId: newUser._id,
                userEmail: newUser.email,
                profilePic_URL: profilePic.url
            }
        });
    }
    catch (err) {
        console.error("Error in registerUser:", err);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
        });
    }
}

export const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        // Check if both fields are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        //getting user by his/her emailId
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: "Invalid Email or Password" })
        }

        //comparing password typed by user with the hashed password saved in DB
        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid Email or Password" })
        }

        // Generate access token
        const token = user.generateAccessToken();

        // Respond with token and basic user info
        res.status(200).json({ message: "Login successfully", token, loggedInUser: { name: user.userName, email: user.email } })
    }
    catch (error) {
        console.error("Error in registerUser:", err);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
        });
    }
}


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        return res.status(201).json({ message: "All Users", users: users })
    }
    catch (error) {
        console.error("Error in registerUser:", err);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
        });
    }
}