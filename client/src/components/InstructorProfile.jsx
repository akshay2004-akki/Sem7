import React, { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen, Mail, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const InstructorProfile = () => {
  const { instructorId } = useParams();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const navigate = useNavigate();

  const currentUserId = localStorage.getItem("userId");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    const fetchInstructorProfile = async () => {
      try {
        // Fetch instructor profile
        const res = await axios.get(
          `http://localhost:8000/api/v1/instructor/${instructorId}`,
          { withCredentials: true }
        );
        setInstructor(res.data.instructorProfile);

        // Fetch instructor courses
        const coursesRes = await axios.get(
          `http://localhost:8000/api/v1/instructor/courses/${instructorId}`,
          { withCredentials: true }
        );
        if (coursesRes.data.courses) {
          setInstructor((prev) => ({
            ...prev,
            courses: coursesRes.data.courses,
          }));
        }

        // Fetch followers
        const followersRes = await axios.get(
          `http://localhost:8000/api/v1/follow/followers/${instructorId}`,
          { withCredentials: true }
        );
        setFollowersCount(followersRes.data.followersCount);

        // Check if current user is following
        if (currentUserId) {
          const followingIds = followersRes.data.followers.map((f) =>
            f.follower.toString()
          );
          setIsFollowing(followingIds.includes(currentUserId));
        }
      } catch (err) {
        console.error(
          "Error fetching instructor profile:",
          err.response || err
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInstructorProfile();
  }, [instructorId, currentUserId]);

  const handleFollowToggle = async () => {
    if (!currentUserId) {
      alert("You must be logged in to follow an instructor.");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/follow/followUnfollow/${currentUserId}/${instructorId}`,
        {},
        { withCredentials: true }
      );

      setIsFollowing((prev) => !prev);
      setFollowersCount((prev) => (isFollowing ? prev - 1 : prev + 1));
      alert(res.data.message);
    } catch (err) {
      console.error("Error following/unfollowing:", err.response || err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading instructor profile...</p>
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Instructor profile not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-12 py-12">
      {/* Header */}
      <div className="max-w-5xl mx-auto bg-zinc-900 rounded-2xl p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Profile Image */}
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-cyan-500 shadow-md">
            <img
              src={instructor.instructorId.avatar || "/default-avatar.png"}
              alt={instructor.instructorId.fullName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Instructor Info */}
          <div className="flex-1 space-y-3">
            <h1 className="text-3xl font-bold text-cyan-400">
              {instructor.instructorId.fullName}
            </h1>
            <p className="text-gray-400">{instructor.bio}</p>

            <div className="flex items-center gap-6 mt-3 text-gray-300">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" /> {instructor.instructorId.email}
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" /> Courses:{" "}
                {instructor.courses ? instructor.courses.length : 0}
              </div>
              <div className="flex items-center gap-2">
                Rating: {instructor.rating.toFixed(1)}
              </div>
            </div>

            {/* Followers and Follow Button */}
            {isLoggedIn &&
              currentUserId.toString() !==
                instructor.instructorId._id.toString() && (
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-cyan-600">
                    <User className="w-5 h-5" /> {followersCount} Followers
                  </div>
                  <button
                    onClick={handleFollowToggle}
                    className={`px-6 py-2 rounded-lg font-semibold ${
                      isFollowing
                        ? "bg-gray-500 text-white hover:bg-gray-400"
                        : "bg-cyan-500 text-black hover:bg-cyan-400"
                    }`}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="max-w-5xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-cyan-400 flex items-center gap-2">
          <BookOpen className="w-6 h-6" /> Courses by{" "}
          {instructor.instructorId.fullName}
        </h2>

        {instructor.courses && instructor.courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructor.courses.map((course) => (
              <div
                key={course._id}
                className="bg-zinc-900 rounded-xl p-5 shadow-md hover:shadow-cyan-500/30 transition duration-300"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="rounded-lg w-full h-40 object-cover mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-3 mb-3">
                  {course.description}
                </p>
                <button
                  onClick={() => navigate(`/courses/${course._id}`)}
                  className="text-cyan-400 hover:underline text-sm font-medium"
                >
                  View Course →
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No courses added yet.</p>
        )}
      </div>
    </div>
  );
};

export default InstructorProfile;
