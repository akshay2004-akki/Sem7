import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// --- INDIVIDUAL RATING STARS COMPONENT ---
const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center justify-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < Math.round(rating) ? "text-yellow-400" : "text-gray-600"
          }
          fill="currentColor"
        />
      ))}
    </div>
  );
};

const InstructorCard = ({ instructor }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/instructor/${instructor.instructorId._id}`);
  };
  return (
    <div
      className="
    relative bg-transparent 
    border-none
    rounded-2xl w-auto
    p-8 text-center 
    flex flex-col items-center justify-center
    transition-all duration-500 
    ease-in-out
    transform
    overflow-hidden
    group
  "
    >
      {/* Gradient border glow for the card */}
      <span
        className="
      absolute inset-0 rounded-2xl p-[2px]
      bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 
      opacity-100 sm:opacity-100 md:opacity-0 md:group-hover:opacity-100
      transition-opacity duration-500
    "
      >
        <span className="block w-full h-full bg-black rounded-2xl"></span>
      </span>

      {/* Card content */}
      <div className="relative  z-10 flex flex-col items-center">
        <img
          src={instructor.instructorId.avatar}
          alt={`Profile of ${instructor.instructorId.fullName}`}
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-gray-700 shadow-lg"
        />
        <h3 className="mt-6 text-xl font-bold text-white">
          {instructor.instructorId.fullName}
        </h3>
        <div className="flex items-center justify-center mt-2 gap-2">
          <StarRating rating={instructor.rating} />
          {/* <span className="text-sm text-gray-400">({instructor.reviews})</span> */}
        </div>
        {/* <p className="mt-2 text-base text-cyan-400">{instructor.expertise}</p> */}

        {/* Gradient button inside */}
        <a
          href="#"
          className="
        relative mt-6 w-full
        text-white 
        font-semibold py-3 px-6 
        rounded-lg 
        transition-all duration-500
        overflow-hidden
        group/button
      "
        >
          {/* Gradient border glow for button */}
          <span
            className="
          absolute inset-0 rounded-lg p-[2px]
          bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500
          opacity-100 sm:opacity-100 md:opacity-0 md:group-hover/button:opacity-100
          transition-opacity duration-500
        "
          >
            <span className="block w-full h-full bg-black rounded-lg"></span>
          </span>

          <span onClick={handleNavigate} className="relative z-10">
            View Courses
          </span>
        </a>
      </div>
    </div>
  );
};

const Instructors = () => {
  const [instructorsData, setInstructorsData] = useState([]);

  useEffect(() => {
    const fetchTopInstructors = async () => {
      try {
        const res = await axios.get(
          `https://sem7-pux8.onrender.com/api/v1/instructor/top`,
          { withCredentials: true }
        );
        console.log("Fetched top instructors:", res.data);
        // ✅ Correct key name from backend
        setInstructorsData(res.data.topInstructors);
      } catch (error) {
        console.error("Error fetching top instructors:", error.message);
      }
    };
    fetchTopInstructors();
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-black via-[#0f1115] to-black py-20 sm:py-24 overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute sm:-top-72 top-[-9rem] left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-pink-500/30 rounded-full filter blur-3xl opacity-60"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={20}
            blurStrength={20}
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Meet the <span className="text-[#00ffff]">Experts</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
              Learn from the best and most experienced instructors in the
              industry.
            </p>
          </ScrollReveal>
        </div>

        {/* Instructors Grid */}
        <div className="mt-16 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {instructorsData.length > 0 ? (
            instructorsData
              .slice(0, 5)
              .map((instructor) => (
                <InstructorCard key={instructor._id} instructor={instructor} />
              ))
          ) : (
            <p className="col-span-full text-center text-gray-400">
              No instructors found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Instructors;
