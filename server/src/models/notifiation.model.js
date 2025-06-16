import { Schema, model } from "mongoose";

const notificationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    link : {
        type: String,
        required: true
    },
    seen: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

export const Notification = model("Notification", notificationSchema);