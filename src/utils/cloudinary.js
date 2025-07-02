import {v2 as cloudinary } from "cloudinary"
import { configDotenv } from "dotenv";
import { response } from "express";
import fs from "fs"

    cloudinary.config({ 
        cloud_name:CLOUDINARY_CLOUD_NAME, 
        api_key: CLOUDINARY_API_KEY,
        api_secret: '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
    });
    


    const  uploadOneCloudinary=async(localFilePath)=>{
        try{
            if(!localFilePath) return null
            cloudinary.uploader.upload(localFilePath,{
                resource_type:"auto"
            })
            console.log("File is uploaded successfully ");
            response.url();
            return response
        }

        catch(error){
            fs.unlinkSync(localFilePath)
            return null;
        }
    }


export {uploadOneCloudinary}