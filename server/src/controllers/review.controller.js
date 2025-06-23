import mongoose, { isValidObjectId } from "mongoose";
import { Review } from "../models/review.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createReview = asyncHandler(async (req, res) => {
  const { courseId, userId } = req.params;
  const { rating, comment } = req.body;

  if (!isValidObjectId(courseId) || !isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid course or user ID");
  }
  if (!rating || rating < 1 || rating > 5) {
    throw new ApiError(400, "Rating must be between 1 and 5");
  }
  const existingReview = await Review.findOne({
    courseId,
    userId,
  });
  if (existingReview) {
    throw new ApiError(400, "You have already reviewed this course");
  }
  const review = await Review.create({
    courseId,
    userId,
    rating,
    comment,
  });

  return res
    .status(200)
    .json({ message: "Review created successfully", review });
});

export const getReviewByCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  if (!isValidObjectId(courseId)) {
    throw new ApiError(400, "Invalid course ID");
  }
  const reviews = await Review.find({ courseId })
    .populate("userId", "name email")
    .sort({ createdAt: -1 });

  if (!reviews || reviews.length === 0) {
    return res
      .status(404)
      .json({ message: "No reviews found for this course" });
  }
  return res
    .status(200)
    .json({ message: "Reviews fetched successfully", reviews });
});

export const getAverageRating = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  if (!isValidObjectId(courseId)) {
    throw new ApiError(400, "Invalid course ID");
  }

  const result = await Review.aggregate([
    { $match: { courseId: new mongoose.Types.ObjectId(courseId) } },
    {
      $group: {
        _id: "$courseId",
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);
  if (result.length === 0) {
    return res.status(200).json({
      success: true,
      averageRating: 0,
      totalReviews: 0,
    });
  }

  const { averageRating, totalReviews } = result[0];
  res.status(200).json({
    success: true,
    averageRating: averageRating.toFixed(2),
    totalReviews,
  });
});
