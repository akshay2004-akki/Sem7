import { Schema, model } from "mongoose";

const certificateSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    certificateUrl: {
        type: String,
        required: true
    }
}, {timestamps: true});

export const Certificate = model("Certificate", certificateSchema);