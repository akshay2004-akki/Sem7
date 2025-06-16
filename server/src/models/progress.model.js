import { Schema, model } from "mongoose";

const progressSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    completedLectures: [{
        type: Schema.Types.ObjectId,
        ref: 'Lecture',
        required: true
    }],
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
})