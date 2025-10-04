import { Instructor } from "../models/instructor.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { isValidObjectId } from "mongoose";
import { Course } from "../models/courses.model.js";


export const createInstructorProfile = asyncHandler(async(req,res)=>{
    const userId = req.user?._id
    const {bio} = req.body;

    if(!userId || !isValidObjectId(userId)){
        throw new ApiError(400, "Invalid user ID");
    }

    if(!bio){
        throw new ApiError(400, "Bio is required"); 
    }

    const existingInstructor = await Instructor.findOne({instructorId: userId});
    if(existingInstructor){
        throw new ApiError(400, "Instructor profile already exists");
    }
    const newInstructor = await Instructor.create({
        instructorId: userId,
        bio,
        rating: 0,
        courseCount: 0,
        totalViews: 0
    });

    return res.status(201).json({
        newInstructor,
        message: "Instructor profile created successfully"
    });
});

export const getInstructorProfile = asyncHandler(async(req,res)=>{
    const userId = req.user?._id;

    if(!userId || !isValidObjectId(userId)){
        throw new ApiError(400, "Invalid user ID");
    }

    const instructorProfile = await Instructor.findOne({instructorId: userId}).populate("instructorId");

    if(!instructorProfile){
        throw new ApiError(404, "Instructor profile not found");
    }

    return res.status(200).json({
        instructorProfile,
        message: "Instructor profile fetched successfully"
    });
});

export const getInstructorById = asyncHandler(async(req,res)=>{
    const {instructorId} = req.params;

    if(!instructorId || !isValidObjectId(instructorId)){
        throw new ApiError(400, "Invalid instructor ID");
    }

    const instructorProfile = await Instructor.findOne({instructorId}).populate("instructorId", "-password -refreshToken -role");

    if(!instructorProfile){
        throw new ApiError(404, "Instructor profile not found");
    }

    return res.status(200).json({
        instructorProfile,
        message: "Instructor profile fetched successfully"
    });
});

export const getAllInstructors = asyncHandler(async(req,res)=>{
    const instructors = await Instructor.find({}).populate("instructorId",);
    if(!instructors || instructors.length === 0){
        throw new ApiError(404, "No instructors found");
    }
    return res.status(200).json({
        instructors,
        message: "Instructors fetched successfully"
    });
});

export const updateInstructorProfile = asyncHandler(async(req,res)=>{
    const userId = req.user?._id;
    const {bio} = req.body;

    if(!userId || !isValidObjectId(userId)){
        throw new ApiError(400, "Invalid user ID");
    }

    if(!bio){
        throw new ApiError(400, "Bio is required");
    }

    const updatedInstructor = await Instructor.findOneAndUpdate(
        {instructorId: userId},
        {bio},
        {new: true}
    );

    if(!updatedInstructor){
        throw new ApiError(404, "Instructor profile not found");
    }

    return res.status(200).json({
        updatedInstructor,
        message: "Instructor profile updated successfully"
    });
});

export const deleteInstructorProfile = asyncHandler(async(req,res)=>{
    const userId = req.user?._id;

    if(!userId || !isValidObjectId(userId)){
        throw new ApiError(400, "Invalid user ID");
    }

    const deletedInstructor = await Instructor.findOneAndDelete({instructorId: userId});

    if(!deletedInstructor){
        throw new ApiError(404, "Instructor profile not found");
    }

    return res.status(200).json({
        message: "Instructor profile deleted successfully"
    });
});

export const getInstructorCourses = asyncHandler(async (req, res) => {
  const { instructorId } = req.params;

  if (!instructorId || !isValidObjectId(instructorId)) {
    throw new ApiError(400, "Invalid instructor ID");
  }

  // Pagination parameters
  let { page, limit } = req.query;
  page = parseInt(page) || 1; // default page = 1
  limit = parseInt(limit) || 10; // default limit = 10
  const skip = (page - 1) * limit;

  // Count total courses for this instructor
  const totalCourses = await Course.countDocuments({ instructorId });

  const courses = await Course.find({ instructorId })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 }); // optional: latest courses first

  if (!courses || courses.length === 0) {
    return res.status(404).json({
      message: "No courses found for this instructor",
    });
  }

  return res.status(200).json({
    courses,
    currentPage: page,
    totalPages: Math.ceil(totalCourses / limit),
    totalCourses,
    message: "Courses fetched successfully",
  });
});



export const rateInstructor = asyncHandler(async(req,res)=>{
    const {instructorId} = req.params;
    const {rating} = req.body;
    const userId = req.user?._id;
    if(!instructorId || !isValidObjectId(instructorId)){    
        throw new ApiError(400, "Invalid instructor ID");
    }
    if(!userId || !isValidObjectId(userId)){
        throw new ApiError(400, "Invalid user ID");
    }
    if(!rating || rating < 1 || rating > 5){
        throw new ApiError(400, "Rating must be between 1 and 5");
    }
    const instructorProfile = await Instructor.findOne({instructorId});
    if(!instructorProfile){
        throw new ApiError(404, "Instructor profile not found");
    }
    
    // Prevent multiple ratings by same user
    const alreadyRated = instructorProfile.ratings.find(r => r.userId.toString() === userId.toString());
    if(alreadyRated){
        throw new ApiError(400, "You have already rated this instructor");
    }
    instructorProfile.ratings.push({userId, rating});
    // Recalculate average rating
    const totalRatings = instructorProfile.ratings.length;
    const sumRatings = instructorProfile.ratings.reduce((acc, r) => acc + r.rating, 0);
    instructorProfile.rating = sumRatings / totalRatings;   
    await instructorProfile.save();

    return res.status(200).json({
        message: "Instructor rated successfully",
        instructorProfile
    });
});

export const hasRatedInstructor = asyncHandler(async(req,res)=>{
    const {instructorId, userId} = req.params;

    if(!instructorId || !isValidObjectId(instructorId)){    
        throw new ApiError(400, "Invalid instructor ID");
    }
    if(!userId || !isValidObjectId(userId)){
        throw new ApiError(400, "Invalid user ID");
    }

    const instructorProfile = await Instructor.findOne({instructorId});
    if(!instructorProfile){
        throw new ApiError(404, "Instructor profile not found");
    }

    const alreadyRated = instructorProfile.ratings.find(r => r.userId.toString() === userId.toString());
    return res.status(200).json({
        hasRated: !!alreadyRated
    });
});

export const getTopInstructors = asyncHandler(async(req,res)=>{
    const topInstructors = await Instructor.find({})
    .sort({rating: -1})
    .limit(5)
    .populate("instructorId", "-password -refreshToken -role");
    if(!topInstructors || topInstructors.length === 0){
        throw new ApiError(404, "No instructors found");
    }
    return res.status(200).json({
        topInstructors,
        message: "Top instructors fetched successfully"
    });
});
