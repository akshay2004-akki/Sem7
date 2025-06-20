import { Schema, model } from "mongoose";

const lectureSchema = new Schema({
    type: {
        type: String,
        enum: ['video', 'quiz', 'text'], 
        required: true
    },
    title :{
        type: String,
        required: true,
        trim: true
    },
    content : {
        type: String,
        required: true,
        trim: true
    },
    sectionId: {
        type: Schema.Types.ObjectId,
        ref: 'Section',
        required: true
    },
    duration: {
        type: Number,
        default: 0
    },
})

export const Lecture = model("Lecture", lectureSchema); 