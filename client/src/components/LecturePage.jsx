import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Video, Clock } from "lucide-react";
import axios from "axios";

const LecturePage = () => {
  const { courseId, lectureId } = useParams();
  const [sections, setSections] = useState([]);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [loading, setLoading] = useState(true);

  const videoRef = useRef(null);
  const lastUpdateRef = useRef(0); // throttle by time
  const lastStatusRef = useRef(null); // prevent duplicate status calls
  const lastDurationRef = useRef(0); // prevent tiny increments

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:8000/api/v1/courses/getCourseById/${courseId}`,
          { withCredentials: true }
        );
        const course = res.data.course;

        setSections(course.sections || []);
        const allLectures = course.sections?.flatMap((s) => s.lectures) || [];
        const lecture =
          allLectures.find((l) => l._id === lectureId) || allLectures[0];
        setCurrentLecture(lecture);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, lectureId]);

  // ✅ Optimized progress update
  const updateProgress = async (watchedDuration, status) => {
    const now = Date.now();

    // Skip if status is unchanged (avoid duplicate "completed" or "in-progress")
    if (status === lastStatusRef.current) return;

    // Skip if watched increment < 5s (except when completed)
    if (status !== "completed" && watchedDuration - lastDurationRef.current < 5) return;

    // Skip if too frequent (<5s), unless "completed"
    if (status !== "completed" && now - lastUpdateRef.current < 5000) return;

    // update trackers
    lastStatusRef.current = status;
    lastDurationRef.current = watchedDuration;
    lastUpdateRef.current = now;

    try {
      await axios.post(
        "http://localhost:8000/api/v1/progress/update",
        {
          courseId,
          lectureId: currentLecture._id,
          watchedDuration: Math.floor(watchedDuration),
          status,
        },
        { withCredentials: true }
      );
      console.log("✅ Progress updated:", status, watchedDuration);
    } catch (err) {
      console.error("❌ Error updating progress:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading course...</p>
      </div>
    );
  }

  if (!currentLecture) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Lecture not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col-reverse md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-80 bg-gray-900 pt-16 p-6 overflow-y-auto">
        <h2 className="text-xl font-semibold text-cyan-400 mb-6">Lectures</h2>
        {sections.map((section, idx) => (
          <div key={section._id} className="mb-6">
            <h3 className="text-lg font-semibold text-cyan-300 mb-3">
              {idx + 1}. {section.title}
            </h3>
            <div className="space-y-2">
              {section.lectures?.map((lecture) => (
                <div
                  key={lecture._id}
                  onClick={() => setCurrentLecture(lecture)}
                  className={`cursor-pointer p-3 rounded-lg flex items-center justify-between ${
                    currentLecture._id === lecture._id
                      ? "bg-cyan-600 text-white"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    <span className="text-sm">{lecture.title}</span>
                  </div>
                  <span className="text-xs flex items-center gap-1">
                    <Clock size={12} /> {lecture.duration} min
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </aside>

      {/* Main Player Area */}
      <main className="flex-1 translate-y-[5vh] p-6 md:p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {currentLecture.title}
        </h1>

        {/* Video Player */}
        {currentLecture.type === "video" && currentLecture.content ? (
          <div className="w-full max-w-4xl aspect-video rounded-lg overflow-hidden shadow-xl mb-6">
            <video
              ref={videoRef}
              controls
              autoPlay
              className="w-full h-full object-cover bg-black rounded-lg"
              src={currentLecture.content}
              onTimeUpdate={(e) => {
                const current = e.target.currentTime;
                const total = e.target.duration;
                const status =
                  current >= total - 2 ? "completed" : "in-progress";
                updateProgress(current, status);
              }}
              onPause={(e) =>
                updateProgress(e.target.currentTime, "in-progress")
              }
              onSeeked={(e) =>
                updateProgress(e.target.currentTime, "in-progress")
              }
              onEnded={(e) => updateProgress(e.target.duration, "completed")}
            />
          </div>
        ) : (
          <p className="text-gray-300">This lecture type is not supported.</p>
        )}

        <p className="text-gray-400 text-center">
          Duration: {currentLecture.duration} min | Type: {currentLecture.type}
        </p>

        {currentLecture.description && (
          <div className="mt-4 text-gray-300 max-w-2xl text-center">
            <p>{currentLecture.description}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default LecturePage;
