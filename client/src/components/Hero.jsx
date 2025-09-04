import React from "react";
import heroLogo from "../assets/herologo.png";

function Hero() {
  return (
    <>
      <section className="relative sm:h-[105vh] overflow-hidden bg-black sm:pb-16 lg:pb-20 xl:pb-24 h-[125vh]">
        <div className="mx-auto p-5 w-full relative sm:px-6 lg:px-8 max-w-7xl">
          <div className="w-full h-auto grid grid-cols-1 lg:grid-cols-2 pt-28 place-items-center gap-12 lg:gap-20">
            {/* Child 1: The Text Column */}
            <div>
              <h1 className="text-4xl font-normal text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                Your Digital Nest for Smarter{" "}
                <span className="text-[#00ffff]">Learning</span>.
              </h1>
              <p className="mt-4 text-lg font-normal text-gray-400 sm:mt-8">
                <span className="text-[#00ffff]">Neuronest</span> is your
                digital nest for smarter learning — an online platform designed
                to make education engaging, accessible, and personalized. With
                interactive courses, real-time learning tools, and a modern
                interface, Neuronest helps learners build knowledge step by step
                and achieve their goals with confidence.
              </p>
            </div>

            {/* Child 2: The Image Column */}
            <div className="relative w-auto h-auto flex justify-center items-center">
              {/* Background glow */}
              <svg
                className="absolute blur-3xl opacity-70"
                style={{ filter: "blur(64px)" }}
                width="444"
                height="536"
                viewBox="0 0 444 536"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M225.919 112.719C343.98 64.6648 389.388 -70.487 437.442 47.574C485.496 165.635 253.266 481.381 135.205 529.435C17.1445 577.488 57.9596 339.654 9.9057 221.593C-38.1482 103.532 107.858 160.773 225.919 112.719Z"
                  fill="url(#c)"
                />
                <defs>
                  <linearGradient
                    id="c"
                    x1="82.7339"
                    y1="550.792"
                    x2="-39.945"
                    y2="118.965"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#00ffff" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Hero image */}
              <img
                className="relative w-full max-w-md mx-auto z-10 shadow-none"
                src={heroLogo}
                alt="Neuronest Hero"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
