import User from "../models/User.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import { use } from "react";
dotenv.config();



export const registerUser = async (req, res) => {
    try {
        let { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return res.send(401).json({ message: "Please provide valid Information..." })
        }

        //checking if email already exists in the DB
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists" });
        }

        //hashing the pass and saving it in DB
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ userName, email, password: hashPassword })
        console.log(newUser);

        //generating token while registering user
        const token = jwt.sign({ userId: newUser._id, username: newUser.userName, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: "1d" })

        return res.status(201).json({ message: "User registered", token });
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

        //getting user by his/her emailId
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: "Invalid Email or Password" })
        }

        //comparing password typed by user with the hashed password saved in DB
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid Email or Password" })
        }

        // Generate JWT token on successful login
        const token = jwt.sign({ userId: user._id, name: user.userName, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
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
        const users = await User.find();
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