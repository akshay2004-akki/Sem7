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
    res.status(400).json({ message: "You have already reviewed this course" });
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
  const { page = 1, limit = 5 } = req.query;

  const reviews = await Review.find({ courseId })
    .populate("userId", "fullName email")
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const total = await Review.countDocuments({ courseId });

  return res.status(200).json({
    reviews,
    total,
    page: parseInt(page),
    totalPages: Math.ceil(total / limit),
  });
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
    averageRating: averageRating.toFixed(1),
    totalReviews,
  });
});
