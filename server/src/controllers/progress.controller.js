import { isValidObjectId } from "mongoose";
import { Progress } from "../models/progress.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const updateProgress = asyncHandler(async (req, res) => {
  const { courseId, lectureId, status, watchedDuration } = req.body;
  const userId = req.user?._id;

  if (!isValidObjectId(courseId) || !isValidObjectId(lectureId)) {
    throw new ApiError(400, "Invalid course or lecture ID");
  }
  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }

  let progress = await Progress.findOne({ courseId, userId });

  if (!progress) {
    progress = await Progress.create({
      courseId,
      userId,
      completedLectures: [
        {
          lectureId,
          status,
          watchedDuration,
          lastUpdated: new Date(),
        },
      ],
    });
  } else {
    const lectureIndex = progress.completedLectures.findIndex(
      (lecture) => lecture.lectureId.toString() === lectureId
    );

    if (lectureIndex !== -1) {
      // Update existing lecture progress
      progress.completedLectures[lectureIndex].watchedDuration =
        watchedDuration;
      progress.completedLectures[lectureIndex].status = status;
      progress.completedLectures[lectureIndex].lastUpdated = new Date();
    } else {
      // Add new lecture progress
      progress.completedLectures.push({
        lectureId,
        watchedDuration,
        status,
        lastUpdated: new Date(),
      });
    }
  }

  await progress.save();
  return res.status(200).json({
    success: true,
    message: "Progress updated successfully",
    data: progress,
  });
});

export const getCourseProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    const progress = await Progress.findOne({ userId, courseId }).populate(
      "completedLectures.lectureId"
    );

    return res.status(200).json({
      message: "Fetched course progress",
      progress: progress || null,
    });
  } catch (error) {
    console.error("Error fetching course progress:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
