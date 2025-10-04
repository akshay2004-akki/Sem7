'use strict';
import { isValidObjectId } from "mongoose";
import { Follow } from "../models/follow.model.js";
import {ApiError} from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const followAndUnfollowUser = asyncHandler(async(req,res)=>{
    const {followerId, followingId} = req.params;

    if(followerId === followingId){
        throw new ApiError(400, "You cannot follow yourself");
    }
    if(!followerId || !followingId || isValidObjectId(followerId) === false || isValidObjectId(followingId) === false){
        throw new ApiError(400, "Invalid followerId or followingId");
    }

    const isAlreadyFollowing = await Follow.findOne({follower:followerId, following:followingId});
    if(isAlreadyFollowing){
        await Follow.findByIdAndDelete(isAlreadyFollowing._id);
        return res.status(200).json({message : "Unfollowed successfully", data : []});
    }


    const createFollower = await Follow.create({follower : followerId, following : followingId});
    if(!createFollower){
        throw new ApiError(500, "Unable to follow user");
    }
    return res.status(200).json({message : "Followed successfully", data : createFollower});

});

export const getUserFollowers = asyncHandler(async(req,res)=>{
    const {followingId} = req.params;

    if(!followingId || isValidObjectId(followingId) === false){
        throw new ApiError(400, "Invalid followingId");
    }
    const followers = await Follow.find({following : followingId});
    return res.status(200).json({message : "Followers fetched successfully", followersCount : followers.length, followers});
});