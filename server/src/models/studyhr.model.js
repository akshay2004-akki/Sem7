import mongoose from "mongoose";

const studyHoursSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  day: { type: String, required: true }, // Mon, Tue, etc.
  hours: { type: Number, default: 0 },
});

export const StudyHours =  mongoose.model("StudyHours", studyHoursSchema);
