import { v2 as cloudinary } from "cloudinary";
import { configDotenv } from "dotenv";
import fs from "fs";

// Load environment variables
configDotenv();

// Configure Cloudinary with your .env values
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload function
const uploadOneCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        console.log("File uploaded successfully:", result.url);
        fs.unlinkSync(localFilePath); // Optional: remove file after upload
        return result;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath); // Clean up local file
        }
        return null;
    }
};

export { uploadOneCloudinary };
