import { Instructor } from "../models/instructor.model";
import { ApiError } from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import { User } from "../models/user.model";


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

    const instructorProfile = await Instructor.findOne({instructorId: userId}).populate("instructorId","fullName email avatar");

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

    const instructorProfile = await Instructor.findOne({instructorId}).populate("instructorId","fullName email avatar");

    if(!instructorProfile){
        throw new ApiError(404, "Instructor profile not found");
    }

    return res.status(200).json({
        instructorProfile,
        message: "Instructor profile fetched successfully"
    });
});

export const getAllInstructors = asyncHandler(async(req,res)=>{
    const instructors = await Instructor.find({}).populate("instructorId","fullName email avatar");
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

