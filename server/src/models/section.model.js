import { Schema, model } from "mongoose";

const sectionSchema = new Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    courseId:{
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    lectrues:[{
        type: Schema.Types.ObjectId,
        ref: 'Lecture',
    }],
})

export const Section = model("Section", sectionSchema);