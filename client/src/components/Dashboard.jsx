import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-black flex justify-center items-start py-6 px-4 sm:py-10 sm:px-6">
      <div className="w-full max-w-6xl mt-10 sm:mt-16 space-y-6">
        {/* Welcome Card */}
        <div className="bg-gray-900 rounded-2xl p-6 shadow-lg text-white flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left */}
          <div className="w-full md:w-auto text-center md:text-left">
            <div className="flex flex-col-reverse md:flex-row-reverse items-center gap-4 md:gap-8 mb-4">
              <h2 className="text-xl sm:text-2xl font-bold">
                Welcome back, <span className="text-cyan-400">Sarah</span>!
              </h2>
              <img
                src=""
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
                  strokeDasharray="50, 100"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute inset-0 flex text-lg sm:text-2xl items-center justify-center font-bold">
                50%
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
              <div className="bg-gray-800 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="w-full">
                  <p className="text-white font-medium text-sm sm:text-base">
                    Web Development Fundamentals
                  </p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div
                      className="bg-cyan-400 h-2 rounded-full"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
                <button className="bg-cyan-500 px-3 py-1 rounded-lg text-white text-xs sm:text-sm w-full sm:w-auto">
                  Continue
                </button>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="w-full">
                  <p className="text-white font-medium text-sm sm:text-base">
                    Data Science for Beginners
                  </p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div
                      className="bg-cyan-400 h-2 rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                </div>
                <button className="bg-cyan-500 px-3 py-1 rounded-lg text-white text-xs sm:text-sm w-full sm:w-auto">
                  Continue
                </button>
              </div>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
            <h3 className="text-white font-semibold mb-4 text-lg sm:text-xl">
              Upcoming Deadlines
            </h3>
            <ul className="text-gray-300 space-y-3 text-sm sm:text-base">
              <li>
                <span className="font-medium text-white">Nov 15:</span> Project
                1 - Web Dev
              </li>
              <li>
                <span className="font-medium text-white">Nov 18:</span> Quiz 2 -
                Critique - UI/UX
              </li>
            </ul>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
            <h3 className="text-white font-semibold mb-4 text-lg sm:text-xl">
              Recent Activity
            </h3>
            <ul className="text-gray-300 space-y-3 text-sm sm:text-base">
              <li>✅ Completed Module 3 in Web Dev</li>
              <li>🏆 Earned "Data Explorer" badge</li>
            </ul>
          </div>
        </div>

        {/* Weekly Study Hours */}
        <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
          <h3 className="text-white font-semibold mb-4 text-lg sm:text-xl">
            Weekly Study Hours
          </h3>
          <div className="flex items-end justify-between sm:justify-start space-x-2 sm:space-x-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
              <div key={i} className="flex flex-col items-center flex-1">
                <div
                  className="bg-cyan-400 w-4 sm:w-6 rounded-md"
                  style={{ height: `${Math.random() * 80 + 20}px` }}
                ></div>
                <span className="text-gray-400 text-xs sm:text-sm mt-2">
                  {day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
