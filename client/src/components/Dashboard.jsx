import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // Replace with the logged-in user's ID
        const userId = localStorage.getItem("userId"); 

        const res = await axios.get(
          `http://localhost:8000/api/v1/dashboard/${userId}`,
          { withCredentials: true }
        );
        setDashboardData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const handleNavigate = (courseId) => {
    navigate(`/courses/${courseId}`);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Loading dashboard...
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        No dashboard data found.
      </div>
    );
  }

  const { user, currentCourses, recentActivity, weeklyHours } = dashboardData;

  // Overall progress for the welcome card
  const overallProgress =
    currentCourses.length > 0
      ? Math.round(
          currentCourses.reduce((acc, c) => acc + c.completionPercent, 0) /
            currentCourses.length
        )
      : 0;

  return (
    <div className="min-h-screen bg-black flex justify-center items-start py-6 px-4 sm:py-10 sm:px-6">
      <div className="w-full max-w-6xl mt-10 sm:mt-16 space-y-6">
        {/* Welcome Card */}
        <div className="bg-gray-900 rounded-2xl p-6 shadow-lg text-white flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left */}
          <div className="w-full md:w-auto text-center md:text-left">
            <div className="flex flex-col-reverse md:flex-row-reverse items-center gap-4 md:gap-8 mb-4">
              <h2 className="text-xl sm:text-2xl font-bold">
                Welcome back,{" "}
                <span className="text-cyan-400">{user.fullName}</span>!
              </h2>
              <img
                src={user.avatar}
                alt="Profile"
                className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-full"
              />
            </div>
            <p className="text-gray-400 text-sm sm:text-base">
              Continue your learning journey
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 36 36"
              >
                <path
                  className="text-gray-700"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-cyan-400"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray={`${overallProgress}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute inset-0 flex text-lg sm:text-2xl items-center justify-center font-bold">
                {overallProgress}%
              </span>
            </div>
            <span className="text-gray-400 text-xs sm:text-sm mt-1">
              Overall Progress
            </span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Current Courses */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
            <h3 className="text-white font-semibold mb-4 text-lg sm:text-xl">
              Current Courses
            </h3>
            <div className="space-y-4">
              {currentCourses.map((course) => (
                <div
                  key={course.courseId}
                  className="bg-gray-800 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="w-full">
                    <p className="text-white font-medium text-sm sm:text-base">
                      {course.title}
                    </p>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div
                        className="bg-cyan-400 h-2 rounded-full"
                        style={{ width: `${course.completionPercent}%` }}
                      ></div>
                    </div>
                  </div>
                  <button onClick={()=>handleNavigate(course.courseId)} className="bg-cyan-500 px-3 py-1 rounded-lg text-white text-xs sm:text-sm w-full sm:w-auto">
                    Continue
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
            <h3 className="text-white font-semibold mb-4 text-lg sm:text-xl">
              Recent Activity
            </h3>
            <ul className="text-gray-300 space-y-3 text-sm sm:text-base">
              {recentActivity.map((activity, idx) => (
                <li key={idx}>
                  ✅ Completed {activity.lectureTitle} in{" "}
                  {activity.courseTitle}
                </li>
              ))}
            </ul>
          </div>

          {/* Weekly Study Hours */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
            <h3 className="text-white font-semibold mb-4 text-lg sm:text-xl">
              Weekly Study Hours
            </h3>
            <div className="flex items-end justify-between sm:justify-start space-x-2 sm:space-x-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (day, i) => (
                  <div key={i} className="flex flex-col items-center flex-1">
                    <div
                      className="bg-cyan-400 w-4 sm:w-6 rounded-md"
                      style={{ height: `${weeklyHours[i] * 10}px` }}
                    ></div>
                    <span className="text-gray-400 text-xs sm:text-sm mt-2">
                      {day}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
