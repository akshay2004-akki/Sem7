import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    console.log(`⛔️ Running verifyJWT middleware for URL: ${req.originalUrl}`);

    // Priority: cookies -> Authorization header
    const token =
      req.header("Authorization")?.replace("Bearer ", "");

    console.log("accessToken:", token);

    if (!token) {
      return next(new ApiError(401, "Unauthorized request"));
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded Token:", decodedToken);

    // Find user by decoded _id, exclude sensitive fields
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return next(new ApiError(401, "Invalid access token"));
    }

    req.user = user; // Attach user to request
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return next(new ApiError(401, "Invalid or expired access token"));
  }
});
