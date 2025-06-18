import { Schema, model } from "mongoose";

const optionSchema = new Schema({
  text: String,
  isCorrect: Boolean,
});

const questionSchema = new Schema({
  questionText: String,
  options: [optionSchema],
});

const quizSchema = new Schema({
  questions: [questionSchema],
  lectureId: {
    type: Schema.Types.ObjectId,
    ref: 'Lecture',
    required: true
  },
});

export const Quiz = model("Quiz", quizSchema);
