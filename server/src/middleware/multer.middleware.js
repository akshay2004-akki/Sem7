// utils/upload.js
import multer from "multer";
import fs from "fs";
import path from "path";

// Ensure temp_uploads folder exists
const tempDir = path.join("temp_uploads");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 1024 * 500 }, // 500 MB limit
});
