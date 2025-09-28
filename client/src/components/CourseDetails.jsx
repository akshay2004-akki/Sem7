import React, { useEffect, useState } from "react";
import { BookOpen, Clock, Users, PlayCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [details, setDetails] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Fetch course details
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/courses/getCourseById/${courseId}`,
          { withCredentials: true }
        );
        setDetails(res.data.course);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchDetails();
  }, [courseId]);

  // Check login status
  useEffect(() => {
    const checkLoginStatus = localStorage.getItem("isLoggedIn") === "true";
    setLoggedIn(checkLoginStatus);
  }, []);

  // Check if enrolled
  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/courses/isEnrolled/${courseId}`,
          { withCredentials: true }
        );
        setIsEnrolled(res.data.isEnrolled);
      } catch (error) {
        console.log(error.message);
      }
    };
    checkEnrollment();
  }, [courseId]);

  // Handle enrollment
  const handleEnrollment = async () => {
    if (!loggedIn) {
      alert("Please log in to enroll in the course.");
      return;
    }
    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/courses/enroll/${courseId}`,
        {},
        { withCredentials: true }
      );
      alert(res.data.message);
      setIsEnrolled(true); // ✅ update enrollment state
    } catch (error) {
      console.log(error.message);
    }
  };

  // Open lecture in new tab
  const openLecturePage = (lecture) => {
    const url = `/course/${courseId}/lecture/${lecture._id}`;
    window.open(url, "_blank");
  };

  if (!details) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading course...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-12 py-12">
      {/* Course Header */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 pt-11">
        {/* Thumbnail */}
        <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-lg relative group">
          <img
            src={details.thumbnail}
            alt="Course Preview"
            className="w-full h-72 object-contain transform group-hover:scale-105 transition duration-300"
          />
          <button className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300">
            <PlayCircle className="w-16 h-16 text-cyan-400" />
          </button>
        </div>

        {/* Course Info */}
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-cyan-400">
            {details.title}
          </h1>
          <p className="text-gray-400">{details.description}</p>
          <div className="flex flex-wrap gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span>{details.language}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <span>{details.instructorId?.fullName}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <span>{details.sections?.length} Sections</span>
            </div>
          </div>

          {!isEnrolled && (
            <button
              onClick={handleEnrollment}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-xl shadow-md transition"
            >
              Enroll Now - {details.price} {details.currency}
            </button>
          )}
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-6">Course Content</h2>
        <div className="space-y-6">
          {details.sections?.map((section, i) => (
            <div
              key={section._id}
              className="bg-gray-900 p-6 rounded-xl shadow-md"
            >
              <h3 className="text-lg font-semibold mb-4">
                {i + 1}. {section.title}
              </h3>
              <div className="space-y-3">
                {section.lectures?.map((lecture) => (
                  <div
                    key={lecture._id}
                    className="flex items-center justify-between bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition"
                  >
                    <span>{lecture.title}</span>
                    {isEnrolled && loggedIn && (
                      <button
                        onClick={() => openLecturePage(lecture)}
                        className="px-3 py-1 text-sm bg-cyan-500 hover:bg-cyan-600 rounded-md flex items-center gap-1"
                      >
                        <PlayCircle className="w-4 h-4" /> Play
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructor Section */}
      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-6">Instructor</h2>
        <div className="flex items-center gap-6 bg-gray-900 p-6 rounded-xl">
          <img
            src="https://source.unsplash.com/150x150/?person,developer"
            alt="Instructor"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold">
              {details.instructorId?.fullName}
            </h3>
            <p className="text-gray-400">{details.instructorId?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
