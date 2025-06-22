import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from "fs"
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_KEY_SECRET
})

export const uploadCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        //upload on cloudinary
        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "public/uploads"
        })

        console.log("File is successfully uploaded", res.url);
        return res
    } catch (error) {
        //once file is uploaded it will get removed from our local public folder
        fs.unlinkSync(localFilePath)
        return null;
    }
}

