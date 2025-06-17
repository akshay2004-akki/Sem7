import { Schema, model } from "mongoose";

const courseSchema = new Schema({
    title : {
        type: String,
        required: true,
        trim: true
    },
    instructorId : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description :{
        type: String,
        required: true,
        trim: true
    },
    category : {
        type: String,
        required: true,
        trim: true
    },
    thumbnail : {
        type: String,
        required: true,
        trim: true
    },
    price : {
        type: Number,
        required: true,
        default: 0
    },
    language : {
        type: String,
        required: true,
        trim: true
    },
    sections : [{
        type : Schema.Types.ObjectId,
        ref: 'Section',
    }]
}, {timestamps: true});

export const Course = model("Course", courseSchema); 