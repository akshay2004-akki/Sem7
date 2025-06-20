import {Section} from '../models/section.model.js';
import {Lecture} from '../models/lecture.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {isValidObjectId} from 'mongoose';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import {Quiz} from '../models/quiz.model.js';


export const addLecture = asyncHandler(async (req, res) => {
  try {
    const { type, duration, title } = req.body; 
    const {sectionId} = req.params;

    if (!['video', 'quiz', 'text'].includes(type)) {
      return res.status(400).json({ message: "Invalid lecture type" });
    }

    let finalContent = "";

    if (type === 'video') {
      if (!req.file) {
        return res.status(400).json({ message: "Video file required" });
      }
      const uploadedVideo = await uploadOnCloudinary(
            req.file.buffer,
            `lectures/${sectionId}`
        );
      finalContent = uploadedVideo.secure_url;
    } else if (type === 'text') {
      finalContent = req.body.content;
    }

    const lecture = await Lecture.create({
      sectionId,
      type,
      title,
      content: finalContent,
      duration: duration || 0,
    });
    

    if (type === 'quiz') {
      const { quiz } = req.body; // quiz = { questions: [...] }
      if (!quiz || !quiz.questions) {
        return res.status(400).json({ message: "Quiz data required" });
      }
      const newQuiz = new Quiz({
        questions: quiz.questions,
        lectureId: lecture._id
      });
      await newQuiz.save();
    }

    const section = await Section.findById(sectionId);
    if (!section) {
      await Lecture.findByIdAndDelete(lecture._id);
      return res.status(404).json({ message: "Section not found" });
    }

    section.lectures.push(lecture._id);
    await section.save();

    res.status(201).json(lecture);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export const getLecture = asyncHandler(async(res,req)=>{
    const {lectureId} = req.params;
    if(!lectureId || !isValidObjectId(lectureId)){
        throw new ApiError(400, "Invalid lecture ID");  
    }
    const lecture = await Lecture.findById(lectureId);
    if(!lecture){
        throw new ApiError(404, "Lecture not found");
    }

    let quiz = null;
    if(lecture.type === "quiz") {
        quiz = await Quiz.findOne({ lectureId: lecture._id });
    }

    return res.status(200).json({
        lecture,
        quiz,
        message: "Lecture fetched successfully"
    });
})

export const updateLecture = asyncHandler(async (req, res) => {
  try {
    const { lectureId } = req.params;
    const { type, content, duration, title } = req.body;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    if (type && !['video', 'text', 'quiz'].includes(type)) {
      return res.status(400).json({ message: "Invalid lecture type" });
    }

    if(title) lecture.title = title;
    if (type) lecture.type = type;
    if (duration) lecture.duration = duration;

    if (type === 'video') {
      if (req.file) {
        const uploadedVideo = await uploadOnCloudinary(
            req.file.buffer,
            `lectures/${lectureId}`
        );
        lecture.content = uploadedVideo.secure_url;
      }
    } else if (type === 'text') {
      lecture.content = content;
    }

    await lecture.save();

    if (type === 'quiz') {
      const { quiz } = req.body;
      if (quiz && quiz.questions) {
        let existingQuiz = await Quiz.findOne({ lectureId: lecture._id });
        if (existingQuiz) {
          existingQuiz.questions = quiz.questions;
          await existingQuiz.save();
        } else {
          const newQuiz = new Quiz({
            questions: quiz.questions,
            lectureId: lecture._id,
          });
          await newQuiz.save();
        }
      }
    }

    res.json({ message: "Lecture updated", lecture });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
})

export const deleteLecture = asyncHandler(async (req, res) => {
  try {
    const { lectureId } = req.params;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    await Lecture.findByIdAndDelete(lectureId);

    if (lecture.type === 'quiz') {
      await Quiz.findOneAndDelete({ lectureId: lectureId });
    }

    // Remove from Section
    await Section.findByIdAndUpdate(
      lecture.sectionId,
      { $pull: { lectures: lecture._id } }
    );

    res.json({ message: "Lecture deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
})

export const getLectureById = asyncHandler(async (req, res) => {
  const { lectureId } = req.params;

  if (!lectureId || !isValidObjectId(lectureId)) {
    throw new ApiError(400, "Invalid lecture ID");
  }

  const lecture = await Lecture.findById(lectureId);
  if (!lecture) {
    throw new ApiError(404, "Lecture not found");
  }

  let quiz = null;
  if (lecture.type === "quiz") {
    quiz = await Quiz.findOne({ lectureId: lecture._id });
  }

  return res.status(200).json({
    lecture,
    quiz,
    message: "Lecture fetched successfully"
  });
});
