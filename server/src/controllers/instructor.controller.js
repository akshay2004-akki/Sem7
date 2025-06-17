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
})