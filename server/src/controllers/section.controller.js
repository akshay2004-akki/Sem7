import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Section } from "../models/section.model.js";
import { isValidObjectId } from "mongoose";
import { Course } from "../models/courses.model.js";


export const addSection = asyncHandler(async(req,res)=>{
    const {courseId} = req.params;
    const userId = req.user?._id;
    const {title} = req.body;
    if(!courseId || !isValidObjectId(courseId)){
        throw new ApiError(400, "Invalid course ID");
    }
    if(!userId || !isValidObjectId(userId)){
        throw new ApiError(400, "Invalid user ID");
    }

    if(!title){
        throw new ApiError(400, "Title is required");
    }
    const newSection = await Section.create({
        title,
        courseId,
    });

    const course = await Course.findById(courseId);
    course.sections.push(newSection._id);
    await course.save({validateBeforeSave: false});


    if(!newSection){
        throw new ApiError(500, "Failed to create section");
    }
    return res.status(201).json({
        newSection,
        message: "Section created successfully"
    });
})

export const updateSection = asyncHandler(async(req,res)=>{
    const {sectionId} = req.params;
    const userId = req.user?._id;
    const {title} = req.body;

    if(!sectionId || !isValidObjectId(sectionId)){
        throw new ApiError(400, "Invalid section ID");
    }
    if(!userId || !isValidObjectId(userId)){
        throw new ApiError(400, "Invalid user ID");
    }

    if(!title){
        throw new ApiError(400, "Title is required");
    }

    const updatedSection = await Section.findByIdAndUpdate(sectionId, {title}, {new: true});
    if(!updatedSection){
        throw new ApiError(500, "Failed to update section");
    }
    
    return res.status(200).json({
        updatedSection,
        message: "Section updated successfully"
    });
})

export const deleteSection = async (req, res) => {
    const {sectionId} = req.params;
  try {
    const section = await Section.findById(sectionId);
    if (!section) return res.status(404).json({ message: "Section not found" });

    const course = await Course.findById(section.courseId);
    course.sections = course.sections.filter(
      (secId) => secId.toString() !== section._id.toString()
    );
    await course.save({validateBeforeSave: false});

    await section.deleteOne({_id : sectionId});
    res.status(200).json({ message: "Section deleted" });
  } catch (err) {
    console.log(err.message);
    
    res.status(500).json({ message: "Server error" });
  }
};