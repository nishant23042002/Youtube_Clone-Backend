import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from "fs"
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    secret: process.env.CLOUD_API_KEY_SECRET
})

export const uploadCloudinary = async (path) => {
    try {
        if (!path) return null;

        //upload on cloudinary
        const res = await cloudinary.uploader.upload(path, {
            resource_type: "auto"
        })

        console.log("File is successfully uploaded", res.url);
        return res
    } catch (error) {
        //once file is uploaded it will get removed from our local public folder
        fs.unlinkSync(path)
        return null;
    }
}

