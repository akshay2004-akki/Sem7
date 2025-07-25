// utils/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (filePath, folder = "") => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      {
        folder,
        resource_type: "auto",
      },
      (error, result) => {
        // Clean up the local temp file
        fs.unlink(filePath, (err) => {
          if (err) console.error("Failed to delete temp file:", err);
        });

        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
};
