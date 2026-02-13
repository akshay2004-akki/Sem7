import asyncHandler from "../utils/asynchandler.js";
import { User } from "../models/user.model.js";
import { Progress } from "../models/progress.model.js";
import { Course } from "../models/courses.model.js";
import { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";

/**
 * GET /api/v1/dashboard/:userId
 * Fetch all data needed for dashboard
 */
export const getDashboardData = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId || !isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  // 1️⃣ Fetch user info
  const user = await User.findById(userId).select("_id fullName avatar");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  

  // 2️⃣ Fetch all progress for this user
  const allProgress = await Progress.find({ userId }).populate("courseId").populate("completedLectures.lectureId", "title");

  console.log(allProgress);
  

  // 3️⃣ Prepare current courses with completion %
  const currentCourses = allProgress.map((progress) => {
    const totalLectures = progress.completedLectures.length;
    const completedLectures = progress.completedLectures.filter(l => l.status === "completed").length;
    const completionPercent = totalLectures === 0 ? 0 : Math.round((completedLectures / totalLectures) * 100);
    return {
      courseId: progress.courseId._id,
      title: progress.courseId.title,
      completionPercent,
    };
  });

  // 4️⃣ Prepare recent activity (last 5 completed lectures)
  const recentActivity = [];

allProgress.forEach((progress) => {
  const courseTitle = progress.courseId?.title || "Unknown Course";

  progress.completedLectures.forEach((lecture) => {
    const lectureTitle = lecture.lectureId?.title || "Unknown Lecture";

    if (lecture.status === "completed") {
      recentActivity.push({
        courseTitle,
        lectureTitle,
        completedAt: lecture.lastUpdated,
      });
    }
  });
});
  recentActivity.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
  const recentActivityTop5 = recentActivity.slice(0, 5);

  // 5️⃣ Calculate weekly study hours
  const weeklyMinutes = Array(7).fill(0);
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  startOfWeek.setHours(0,0,0,0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23,59,59,999);

  allProgress.forEach(progress => {
    progress.completedLectures.forEach(lecture => {
      const updatedAt = new Date(lecture.lastUpdated);
      if (updatedAt >= startOfWeek && updatedAt <= endOfWeek) {
        const dayIndex = updatedAt.getDay();
        weeklyMinutes[dayIndex] += lecture.watchedDuration / 60; // seconds → minutes
      }
    });
  });
  const weeklyHours = weeklyMinutes.map(m => +(m / 60).toFixed(1)); // minutes → hours

  // Send full dashboard data
  res.status(200).json({
    user: {
      _id: user._id,
      fullName: user.fullName,
      avatar: user.avatar,
    },
    currentCourses,
    recentActivity: recentActivityTop5,
    weeklyHours,
    message: "Dashboard data fetched successfully",
  });
});
