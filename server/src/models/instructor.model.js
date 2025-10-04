import { Schema, model } from "mongoose";

const instructorSchema = new Schema({
    instructorId :{
        type : Schema.Types.ObjectId,
        ref: 'User',
    },
    bio:{
        type: String,
        default: "",
    },
    ratings : [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        }
        }],
    rating:{
        type: Number,
        default: 0,
    },
    courseCount:{
        type: Number,
        default: 0,
    },
    totalViews:{
        type: Number,
        default: 0,
    },
})

export const Instructor = model("Instructor", instructorSchema);