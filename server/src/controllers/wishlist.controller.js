import { Wishlist } from "../models/wishlist.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";

export const addTowishList = asyncHandler(async(req,res)=>{
    const {courseId} = req.params;
    const userId = req.user._id;
     if(!courseId || !isValidObjectId(courseId)){
        throw new ApiError(400, "Invalid course ID"); 
    }

    const existingWishlist = await Wishlist.findOne({userId, courseId})
    if(existingWishlist){
        throw new ApiError(400, "Course already exists in wishlist");
    }   

    const wishlist = await Wishlist.create({userId, courseId});
    if(!wishlist){
        throw new ApiError(500, "Failed to add course to wishlist");
    }

    const user = await User.findById(userId);
    user.wishlist.push(courseId);
    await user.save();

     // Optionally, you can populate the course details if needed
    return res.status(201).json({
        success: true,
        message: "Course added to wishlist successfully",
        wishlist
    });
})

export const getWishlistItems = asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    const wishlistItems = await Wishlist.find({userId}).populate('courseId', 'title description price thumbnail').populate('userId', 'fullName');
    if(!wishlistItems || wishlistItems.length === 0){
        throw new ApiError(404, "No items found in wishlist");
    }
    return res.status(200).json({
        success: true,
        message: "Wishlist items retrieved successfully",
        wishlistItems
    });
})

export const removeFromWishlist = asyncHandler(async(req,res)=>{
    const {courseId}= req.params;
    const userId = req.user._id;

    if(!courseId || !isValidObjectId(courseId)){
        throw new ApiError(400, "Invalid course ID");
    }

    await Wishlist.findOneAndDelete({userId, courseId});
    const user = await User.findById(userId);
    user.wishlist = user.wishlist.filter(id => id.toString() !== courseId);
    await user.save();

    return res.status(200).json({
        success: true,
        message: "Course removed from wishlist successfully"
    });
});