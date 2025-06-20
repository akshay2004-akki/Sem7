import { Schema, model } from "mongoose";

const wishlistSchema = new Schema({
    userId:{
        type : Schema.Types.ObjectId,
        ref: 'User', 
    },
    courseId:{
        type : Schema.Types.ObjectId,
        ref: 'Course', 
    }   
})

export const Wishlist = model("Wishlist", wishlistSchema);