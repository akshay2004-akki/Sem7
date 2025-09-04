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
          src={instructor.imageUrl}
          alt={`Profile of ${instructor.name}`}
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-gray-700 shadow-lg"
        />
        <h3 className="mt-6 text-xl font-bold text-white">{instructor.name}</h3>
        <div className="flex items-center justify-center mt-2 gap-2">
          <StarRating rating={instructor.rating} />
          <span className="text-sm text-gray-400">({instructor.reviews})</span>
        </div>
        <p className="mt-2 text-base text-cyan-400">{instructor.expertise}</p>

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

          <span className="relative z-10">View Courses</span>
        </a>
      </div>
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
            Meet the <span className="text-[#00ffff]">Experts</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            Learn from the best and most experienced instructors in the
            industry.
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
