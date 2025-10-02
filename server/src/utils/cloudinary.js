// utils/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs/promises"; // use promise-based fs

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (filePath, folder = "") => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "auto",
    });
    return result;
  } catch (err) {
    throw err;
  } finally {
    // Ensure the temp file is deleted whether upload succeeds or fails
    try {
      await fs.unlink(filePath);
      console.log(`Temp file ${filePath} deleted`);
    } catch (unlinkErr) {
      console.error(`Failed to delete temp file ${filePath}:`, unlinkErr);
    }
  }
};
