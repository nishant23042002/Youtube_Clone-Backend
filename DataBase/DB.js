import mongoose from "mongoose";
import { DATABASE_NAME } from "../utils/constants.js";
import dotenv from "dotenv"
dotenv.config();

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_URI}/${DATABASE_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB connected DB: ${connection.connection.host}`);
    }
    catch (error) {
        console.error("Error connecting MongoDB: ", error)
        process.exit(1);
    }
}



