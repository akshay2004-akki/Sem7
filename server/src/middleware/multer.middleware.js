import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 * 1024 }, // 20MB limit
});