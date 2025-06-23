import { Schema, model } from "mongoose";

const progressSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  completedLectures: [
    {
      lectureId: {
        type: Schema.Types.ObjectId,
        ref: 'Lecture',
        required: true
      },
      status: {
        type: String,
        enum: ['in-progress', 'completed'],
        default: 'in-progress',
        required: true
      },
      watchedDuration: {
        type: Number, // in seconds
        default: 0
      },
      lastUpdated: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

export const Progress = model("Progress", progressSchema);
