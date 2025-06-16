import { Schema, model } from "mongoose";

const instructorSchema = new Schema({
    instructorId :{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    bio:{
        type: String,
    },
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