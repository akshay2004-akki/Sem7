import React from "react";
import { Star, StarHalf } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const reviewData = [
  {
    id: 1,
    name: "Priya Sharma",
    title: "Student , Full-Stack Web Devolopment",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    review:
      "This platform transformed my understanding of web development. The courses are structured perfectly, and the hands-on projects are invaluable. Highly recommended!",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    title: "Data Science Enthusiast",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    rating: 4.5,
    review:
      "The Data Science track is comprehensive and up-to-date. The instructors are experts in their field. My only suggestion would be to add more advanced-level quizzes.",
  },
  {
    id: 3,
    name: "Anjali Singh",
    title: "Beginner, UX Design",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    review:
      "As a complete beginner, I found the UX Design course incredibly accessible. The content is broken down into easy-to-digest modules. I feel confident in my new skills!",
  },
  {
    id: 4,
    name: "Vikram Mehta",
    title: "Professional, Machine Learning",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
    rating: 5,
    review:
      "I've taken many online courses, but the Machine Learning content here is top-notch. The practical applications and real-world datasets make all the difference.",
  },
];

const starRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = rating - fullStars - (hasHalfStar ? 1 : 0);

  // for fullstarts
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star
        key={`full-${i}`}
        className="text-amber-400 fill-amber-400"
        size={20}
      />
    );
  }

  // for halfstar if there
  if (hasHalfStar) {
    stars.push(
      <StarHalf
        key="half"
        className="text-amber-400 fill-amber-400"
        size={20}
      />
    );
  }

  // for empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} className="text-gray-600" size={20} />);
  }

  <div className="flex items-center gap-1">{stars}</div>;
};

export default function ReviewsSection() {
  return (
    <>
      <div className="bg-gradient-to-b from-black via-[#0f1115] to-black text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center">
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={10}
              blurStrength={20}
            >
              <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
                What Our <span className="text-[#00ffff]">Student</span> Say
              </p>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                Hear from our community of learners and see how our platform has
                helped them achieve their goals.
              </p>
            </ScrollReveal>
          </div>

          {/* Reviews Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {reviewData.map((review) => (
              // --- THIS IS THE CHANGED PART ---
              <div
                key={review.id}
                className="relative group transform transition-transform duration-300 hover:scale-105"
              >
                {/* Gradient border that appears on hover */}
                <div
                  className="absolute -inset-px bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 rounded-xl opacity-0  group-hover:opacity-100 transition-opacity duration-500"
                  aria-hidden="true"
                />

                {/* The main card content */}
                <div className="relative bg-black rounded-xl shadow-lg p-8 h-full">
                  <div className="flex items-start gap-5">
                    {/* User Avatar */}
                    <img
                      className="h-16 w-16 rounded-full object-cover border-4 border-gray-700"
                      src={review.avatarUrl}
                      alt={review.name}
                    />
                    <div className="flex-1">
                      {/* User Info and Rating */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {review.name}
                          </h3>
                          <p className="text-sm text-cyan-400">
                            {review.title}
                          </p>
                        </div>
                        <div className="hidden sm:block">
                          <starRating rating={review.rating} />
                        </div>
                      </div>
                      {/* Review Text */}
                      <p className="mt-4 text-gray-300 leading-relaxed relative">
                        <span className="absolute -top-3 -left-4 text-6xl text-gray-700 font-serif opacity-50">
                          “
                        </span>
                        {review.review}
                      </p>
                      <div className="sm:hidden mt-4">
                        <starRating rating={review.rating} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
