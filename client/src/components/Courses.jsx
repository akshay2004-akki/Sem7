import React from "react";
import SplitText from "./SplitText";

function Courses() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };
  const handleNavigate = (courseId) => {
    // Logic to navigate to course detail page
    console.log(`Navigate to course with ID: ${courseId}`);
  }

  // Example courses array
  const courses = [
    {
      id: 1,
      title: "Web Development Bootcamp",
      description: "Learn HTML, CSS, JavaScript, and React from scratch.",
      category: "Development",
      thumbnail: "/assets/logo.png",
      price: 499,
      currency: "INR",
    },
    {
      id: 2,
      title: "Data Structures & Algorithms",
      description: "Master problem-solving and coding interview preparation.",
      category: "Programming",
      thumbnail: "/assets/student.png",
      price: 799,
      currency: "INR",
    },
    {
      id: 3,
      title: "Machine Learning Essentials",
      description: "Build ML models and understand core AI concepts.",
      category: "AI/ML",
      thumbnail: "/assets/herologo.png",
      price: 999,
      currency: "INR",
    },
    {
      id: 4,
      title: "UI/UX Design Masterclass",
      description: "Learn to design stunning user interfaces and experiences.",
      category: "Design",
      thumbnail: "/assets/logo.png",
      price: 599,
      currency: "INR",
    },
  ];

  return (
    <>
      <section className="min-h-screen bg-black sm:pb-16 lg:pb-20 xl:pb-24">
        <div className="mx-auto p-5 w-full relative sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col mt-16 items-center justify-center">
            {/* Heading */}
            <div>
              <SplitText
                text="Discover Courses That Empower You"
                className="text-3xl text-white font-semibold text-center"
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
                onLetterAnimationComplete={handleAnimationComplete}
              />
            </div>

            {/* Course Cards */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-[#060010] text-white rounded-2xl shadow-lg overflow-hidden transition duration-300"
                >
                  {/* Thumbnail */}
                  <div className="h-44 w-full overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="h-full w-full object-cover hover:scale-105 transition duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col gap-4 h-full">
                    {/* Title as button */}
                    <button
                      onClick={() => handleNavigate(course.id)}
                      className="text-lg font-bold text-left text-white hover:text-cyan-400 transition-colors duration-300 line-clamp-2"
                    >
                      {course.title}
                    </button>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                      {course.description}
                    </p>

                    {/* Footer row */}
                    <div className="flex items-center justify-between mt-auto pt-3">
                      <span className="text-xs sm:text-sm px-3 py-1 bg-[#1c1c1c] text-cyan-400 rounded-full">
                        {course.category}
                      </span>
                      <span className="font-semibold text-cyan-300 text-sm sm:text-base">
                        {course.currency} {course.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Courses;
