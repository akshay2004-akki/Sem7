import React from "react";
import { CardCarousel } from "@/components/ui/card-carousel";
import ScrollReveal from "./ScrollReveal";

// Example course data
const courses = [
  {
    id: 1,
    title: "Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, and React from scratch.",
    image: "/assets/logo.png",
  },
  {
    id: 2,
    title: "Data Structures & Algorithms",
    description: "Master problem-solving and coding interview preparation.",
    image: "./assets/herologo.png",
  },
  {
    id: 3,
    title: "Machine Learning Essentials",
    description: "Build ML models and understand core AI concepts.",
    image: "/assets/student.png",
  },
];

function Featured() {
  return (
    <div className="w-full min-h-[100vh] bg-black text-white flex flex-col items-center py-20 px-5 relative overflow-hidden">
      {/* Background blob glow - centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="blur-3xl opacity-70 w-[600px] h-[600px]"
          viewBox="0 0 600 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="blobGradient2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ff00ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00ffff" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <path
            d="M437.5 315.2c38.6 62.4 49.4 141.3 8.9 190.9-40.5 49.7-130.1 69.9-204.7 66.6-74.6-3.3-133.9-30.1-169.7-82.3-35.8-52.2-47.9-129.8-23.4-190.4 24.5-60.6 85.5-104.3 153.9-122.7 68.4-18.4 144.2-11.6 192.7 26.5 48.5 38.2 64.7 99.1 42.3 158.4z"
            fill="url(#blobGradient2)"
          />
        </svg>
      </div>
      <div className="absolute bottom-[-10rem] left-[-10rem] w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/40 rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-10rem] right-[-10rem] w-64 h-64 sm:w-96 sm:h-96 bg-purple-600/40 rounded-full filter blur-3xl opacity-50"></div>

      {/* Hero content */}
      <div className="relative z-10 text-center mt-10">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={20}
          blurStrength={20}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Featured <span className="text-[#00ffff]">Courses</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed">
            Discover top-rated courses with expert instructors and engaging
            lessons.
          </p>
        </ScrollReveal>

        <div className="mt-5 w-full">
          <CardCarousel
            courses={courses}
            autoplayDelay={3000}
            showPagination={true}
            showNavigation={true}
          />
        </div>
      </div>
    </div>
  );
}

export default Featured;
