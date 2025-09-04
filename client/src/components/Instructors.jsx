import React from "react";
import { Star } from "lucide-react";

const instructorsData = [
  {
    id: 1,
    name: "Sarah Dole",
    expertise: "UX/UI Design",
    rating: 4.9,
    reviews: 124,
    imageUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "John Brix",
    expertise: "React & Frontend",
    rating: 4.8,
    reviews: 98,
    imageUrl:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Eliza Beth",
    expertise: "Data Science & Python",
    rating: 4.9,
    reviews: 212,
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Mike Wheeler",
    expertise: "Cloud & DevOps",
    rating: 4.7,
    reviews: 76,
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
];

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
  return (
    <div
      className="
        bg-[#161B22] 
        border border-gray-700/50 
        rounded-2xl 
        p-8 text-center 
        flex flex-col items-center
        transition-all duration-300 
        ease-in-out
        transform hover:-translate-y-2 hover:scale-105
        hover:border-cyan-500/50
        hover:shadow-xl hover:shadow-cyan-500/20
      "
    >
      <img
        src={instructor.imageUrl}
        alt={`Profile of ${instructor.name}`}
        className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-gray-700 shadow-lg"
      />
      <h3 className="mt-6 text-xl font-bold text-white">
        {instructor.name}
      </h3>
      <div className="flex items-center justify-center mt-2 gap-2">
        <StarRating rating={instructor.rating} />
        <span className="text-sm text-gray-400">
          ({instructor.reviews})
        </span>
      </div>
      <p className="mt-2 text-base text-cyan-400">
        {instructor.expertise}
      </p>
      <a
        href="#"
        className="
          mt-6 w-full
          bg-cyan-600 text-white 
          font-semibold py-3 px-6 
          rounded-lg 
          transition-colors duration-300 
          hover:bg-cyan-500
          focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75
        "
      >
        View Courses
      </a>
    </div>
  );
};

const Instructors = () => {
  return (
    <section className="relative bg-gradient-to-b from-black via-[#0f1115] to-black py-20 sm:py-24 overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute sm:-top-72 top-[-9rem] left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-pink-500/30 rounded-full filter blur-3xl opacity-60"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Meet the Experts
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            Learn from the best and most experienced instructors in the industry.
          </p>
        </div>

        {/* Responsive Grid for Instructors */}
        <div className="mt-16 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {instructorsData.map((instructor) => (
            <InstructorCard key={instructor.id} instructor={instructor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructors;
