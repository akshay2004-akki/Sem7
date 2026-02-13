import React, { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen, User, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../context/ApiContext";

const InstructorProfile = () => {
  const { instructorId } = useParams();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const navigate = useNavigate();

  const currentUserId = localStorage.getItem("userId");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const { api } = useApi();

  // =============================
  // 1️⃣ Fetch Instructor Profile
  // =============================
  useEffect(() => {
    const loadInstructor = async () => {
      try {
        const data = await api.instructor.getProfile(instructorId);
        setInstructor(data.instructorProfile);
      } catch (err) {
        console.error("Error loading instructor profile:", err);
      }
    };

    loadInstructor();
  }, [instructorId]);

  // =============================
  // 2️⃣ Fetch Followers
  // =============================
  useEffect(() => {
    const loadFollowers = async () => {
      try {
        const data = await api.follow.followers(instructorId);

        setFollowersCount(data.followersCount);

        if (currentUserId) {
          const ids = data.followers.map((f) => f.follower.toString());
          setIsFollowing(ids.includes(currentUserId));
        }
      } catch (err) {
        console.error("Error loading followers:", err);
      }
    };

    loadFollowers();
  }, [instructorId, currentUserId]);

  // =============================
  // 3️⃣ Fetch Instructor Courses
  // =============================
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await api.instructor.getCourses(instructorId, page);

        setInstructor((prev) => {
          if (!prev)
            return { courses: data.courses, instructorId: {}, bio: "", rating: 0 };
          return { ...prev, courses: data.courses };
        });

        setTotalCourses(data.totalCourses);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Error loading courses:", err);
      }
    };

    loadCourses();
  }, [instructorId, page]);

  // =============================
  // 4️⃣ Check If User Already Rated
  // =============================
  useEffect(() => {
    if (!currentUserId) return;

    const checkRating = async () => {
      try {
        const res = await api.instructor.hasRated(instructorId, currentUserId);
        setHasRated(res.hasRated);
      } catch (err) {
        console.error("Error checking rating:", err);
      }
    };

    checkRating();
  }, [instructorId, currentUserId]);

  // =============================
  // 5️⃣ Stop global loading
  // =============================
  useEffect(() => {
    if (instructor && instructor.instructorId) {
      setLoading(false);
    }
  }, [instructor]);

  // =============================
  // FOLLOW / UNFOLLOW
  // =============================
  const handleFollowToggle = async () => {
    if (!currentUserId) {
      alert("You must be logged in to follow an instructor.");
      return;
    }

    try {
      await api.follow.followUnFollowUser(currentUserId, instructorId);

      setIsFollowing((prev) => !prev);
      setFollowersCount((prev) => (!isFollowing ? prev + 1 : prev - 1));
    } catch (err) {
      console.error("Error following/unfollowing:", err.response || err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  // =============================
  // ⭐ Submit Rating
  // =============================
  const handleRatingSubmit = async (ratingValue) => {
    if (!isLoggedIn) return alert("Login to rate the instructor.");
    if (hasRated) return alert("You have already rated this instructor.");

    try {
      const res = await axios.post(
        `https://sem7-pux8.onrender.com/api/v1/instructor/rate/${instructorId}`,
        { rating: ratingValue },
        { withCredentials: true }
      );

      setInstructor(res.data.instructorProfile);
      setHasRated(true);
      setUserRating(ratingValue);
    } catch (err) {
      console.error("Rating error:", err.response || err);
      alert(err.response?.data?.message || "Unable to rate instructor");
    }
  };

  // =============================
  // LOADING UI
  // =============================
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white px-6 md:px-12 py-12 animate-pulse">
        <div className="max-w-5xl mx-auto bg-zinc-900 rounded-2xl p-8 shadow-xl flex flex-col md:flex-row items-center gap-8">
          <div className="w-40 h-40 rounded-full bg-gray-700"></div>
          <div className="flex-1 space-y-4 w-full">
            <div className="h-8 bg-gray-700 rounded w-3/5"></div>
            <div className="h-4 bg-gray-600 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // =============================
  // FINAL RENDER
  // =============================
  return (
    <div className="min-h-screen bg-black text-white px-6 pt-[60px] md:px-12 py-12">
      {/* Header */}
      <div className="max-w-5xl mx-auto bg-zinc-900 rounded-2xl p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Profile Image */}
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-cyan-500 shadow-md">
            <img
              src={instructor?.instructorId?.avatar || "/default-avatar.png"}
              alt={instructor?.instructorId?.fullName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Instructor Info */}
          <div className="flex-1 space-y-3">
            <h1 className="text-3xl font-bold text-cyan-400">
              {instructor?.instructorId?.fullName}
            </h1>
            <p className="text-gray-400">{instructor?.bio}</p>

            <div className="flex items-center gap-6 mt-3 text-gray-300">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" /> Courses: {totalCourses}
              </div>
              <div className="flex items-center gap-2">
                ⭐ Rating: {instructor?.rating?.toFixed(1) || 0}
              </div>
            </div>

            {/* Followers and Follow Button */}
            <div className="mt-4 flex items-center gap-4">
              {/* Followers count */}
              <div className="flex items-center gap-2 bg-cyan-600 px-3 py-1 rounded-lg">
                <User className="w-5 h-5" /> {followersCount} Followers
              </div>

              {/* Follow button */}
              {isLoggedIn &&
                currentUserId.toString() !==
                  instructor?.instructorId?._id?.toString() && (
                  <button
                    onClick={handleFollowToggle}
                    className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                      isFollowing
                        ? "bg-gray-500 text-white hover:bg-gray-400"
                        : "bg-cyan-500 text-black hover:bg-cyan-400"
                    }`}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                )}
            </div>

            {/* ⭐ Rating Section */}
            {isLoggedIn &&
              currentUserId.toString() !==
                instructor?.instructorId?._id?.toString() && (
                <div className="mt-5">
                  <p className="text-gray-300 font-medium mb-2">
                    Rate this instructor:
                  </p>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        onMouseEnter={() => !hasRated && setHoverRating(star)}
                        onMouseLeave={() => !hasRated && setHoverRating(0)}
                        onClick={() => !hasRated && handleRatingSubmit(star)}
                        className={`w-7 h-7 cursor-pointer transition-colors ${
                          (hoverRating || userRating || instructor.rating) >=
                          star
                            ? "text-yellow-400"
                            : "text-gray-500"
                        }`}
                      />
                    ))}
                    {hasRated && (
                      <span className="ml-2 text-green-400 text-sm">
                        ✅ You rated this instructor
                      </span>
                    )}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="max-w-5xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-cyan-400 flex items-center gap-2">
          <BookOpen className="w-6 h-6" /> Courses by{" "}
          {instructor?.instructorId?.fullName}
        </h2>

        {instructor?.courses && instructor.courses.length > 0 ? (
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorProfile;
