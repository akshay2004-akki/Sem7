import React, { useState, useEffect, useRef } from "react";
import Tilt from "react-parallax-tilt";
import { Lightbulb, Brain, Globe } from "lucide-react";

const features = [
  {
    icon: <Lightbulb size={20} />,
    title: "Learn Anything, Anytime",
    description:
      "From coding and design to music, science, and business—expand your knowledge in any domain you choose.",
  },
  {
    icon: <Brain size={20} />,
    title: "Personalized Learning Path",
    description:
      "AI-driven recommendations and structured learning plans help you master skills faster and smarter.",
  },
  {
    icon: <Globe size={20} />,
    title: "Global Knowledge Hub",
    description:
      "Connect with learners and experts worldwide. Share ideas, collaborate, and grow together.",
  },
];

export default function Connect() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [positions, setPositions] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const itemRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (itemRefs.current.length) {
      const pos = itemRefs.current.map((el) => el?.offsetTop || 0);
      setPositions(pos);
    }
  }, []);

  const highlighterTopPosition = positions[activeIndex] || 0;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  const handleMouseLeave = () => {
    setMousePosition({ x: -100, y: -100 });
  };

  return (
    <section
      className="w-full bg-black text-white flex items-center px-3 md:p-0 justify-center py-20 relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Mouse glow effect */}
      <div
        className="pointer-events-none absolute -inset-20 opacity-40 blur-3xl transition duration-300"
        style={{
          background: `radial-gradient(400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,191,255,0.35), transparent 40%)`,
        }}
      ></div>

      <Tilt
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        glareEnable={true}
        glareMaxOpacity={0.2}
        className="max-w-6xl w-full mx-auto p-10 px-6 sm:px-8 relative rounded-2xl bg-gradient-to-r from-gray-900/30 to-gray-900/60 border border-gray-700 backdrop-blur-lg shadow-lg"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
          {/* Left Column */}
          <div className="w-full md:w-1/2 relative">
            <div
              aria-hidden="true"
              className="absolute left-6 top-0 w-0.5 h-full bg-[#161d29]"
            ></div>

            <div
              className="absolute left-6 w-0.5 bg-[#00bfff] transition-all duration-500 ease-in-out"
              style={{
                top: `${highlighterTopPosition}px`,
                height: "70px",
              }}
            ></div>

            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              {features.map((feature, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={index}
                    ref={(el) => (itemRefs.current[index] = el)}
                    className="flex items-start gap-4 sm:gap-6 p-2 relative z-10"
                  >
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-[#00bfff] text-black scale-110 shadow-lg shadow-cyan-500/50"
                          : "bg-[#2c333f] text-gray-300"
                      }`}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg text-white">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-[#9CA3AF] mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <p className="text-blue-400 font-semibold text-sm uppercase tracking-wide">
              Unlock Your Potential
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 text-white">
              A Universe of Learning Awaits
            </h2>
            <p className="text-[#9CA3AF] mt-4">
              Explore limitless opportunities. Whether you're curious about
              technology, arts, health, or entrepreneurship—our platform gives
              you the power to learn, create, and grow without boundaries.
            </p>
            <button className="mt-8 bg-[#00ffff] text-black font-semibold py-3 px-8 rounded-lg hover:bg-black hover:border hover:text-white duration-200 transition-all shadow-lg shadow-cyan-500/50">
              Start Learning Today
            </button>
          </div>
        </div>
      </Tilt>
    </section>
  );
}
