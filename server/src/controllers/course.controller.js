import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Course } from "../models/courses.model.js";
import { isValidObjectId } from "mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createCourse = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { title, description, category, price, language } = req.body;
  if (!userId || !isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }
  if (!title || !description || !category || !price || !language) {
    throw new ApiError(400, "All fields are required");
  }

  if (!req.file || !req.file.buffer) {
    throw new ApiError(400, "Course thumbnail image is required");
  }

  const uploadedImage = await uploadOnCloudinary(
    req.file.buffer,
    `thumbnail/${userId}`
  );

  const newCourse = await Course.create({
    title,
    instructorId: userId,
    description,
    category,
    thumbnail: uploadedImage.secure_url,
    price,
    language,
  });
  if (!newCourse) {
    throw new ApiError(500, "Failed to create course");
  }
  return res.status(201).json({
    newCourse,
    message: "Course created successfully",
  });
});

export const updateCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user?._id;
  const { title, description, category, price, language } = req.body;
  if (!courseId || !isValidObjectId(courseId)) {
    throw new ApiError(400, "Invalid course ID");
  }
  if (!userId || !isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }
  if (course.instructorId.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to update this course");
  }
  if (!req.file || !req.file.buffer) {
    throw new ApiError(400, "Course thumbnail image is required");
  }
  const uploadedImage = await uploadOnCloudinary(
    req.file.buffer,
    `thumbnail/${userId}`
  );
  const updatedCourse = await Course.findByIdAndUpdate(
    courseId,
    {
      title,
      description,
      category,
      thumbnail: uploadedImage.secure_url,
      price,
      language,
    },
    { new: true }
  );
  if (!updatedCourse) {
    throw new ApiError(500, "Failed to update course");
  }
  return res.status(200).json({
    updatedCourse,
    message: "Course updated successfully",
  });
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user?._id;
  if (!courseId || !isValidObjectId(courseId)) {
    throw new ApiError(400, "Invalid course ID");
  }
  if (!userId || !isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }
  if (course.instructorId.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to delete this course");
  }
  await Course.findByIdAndDelete(courseId);
  return res.status(200).json({
    message: "Course deleted successfully",
  });
});

export const getCourseById = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  if (!courseId || !isValidObjectId(courseId)) {
    throw new ApiError(400, "Invalid course ID");
  }
  const course = await Course.findById(courseId)
    .populate("instructorId", "fullName email")
    .populate("sections");
  if (!course) {
    throw new ApiError(404, "Course not found");
  }
  return res.status(200).json({
    course,
    message: "Course retrieved successfully",
  });
});

export const getInstructorCourses = asyncHandler(async (req, res) => {
  const { instructorId } = req.params;
  if (!instructorId || !isValidObjectId(instructorId)) {
    throw new ApiError(400, "Invalid instructor ID");
  }
  const courses = await Course.find({ instructorId }).populate(
    "instructorId",
    "fullName email"
  );
  if (!courses || courses.length === 0) {
    return res.status(404).json({
      message: "No courses found for this instructor",
    });
  }
  return res.status(200).json({
    courses,
    message: "Courses retrieved successfully",
  });
});

export const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();
  if (!courses || courses.length === 0) {
    return res.status(404).json({
      message: "No courses found",
    });
  }
  return res.status(200).json({
    courses,
    message: "Courses retrieved successfully",
  });
});

export const browseCourses = asyncHandler(async (req, res) => {
  try {
    const { search, category, price, rating } = req.query;

    const courses = await Course.find({
      title: { $regex: search, $options: "i" },
    });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
