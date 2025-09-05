import React, { useState } from "react";
import { SiReact, SiJavascript, SiPython } from "react-icons/si";
import { FaRobot } from "react-icons/fa";

const icons = [
  { icon: <SiReact />, label: "React", color: "#61DBFB" },
  { icon: <SiPython />, label: "Data Science", color: "#3776AB" },
  { icon: <FaRobot />, label: "AI/ML", color: "#FF6F61" },
  { icon: <SiJavascript />, label: "JavaScript", color: "#F7DF1E" },
];

export default function TrendingTech() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative w-full bg-black text-white py-20 px-6 md:px-14 flex flex-col items-center overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute top-[6rem] left-[6rem] w-40 h-40 sm:w-56 sm:h-56 bg-blue-500/30 rounded-full filter blur-2xl opacity-50 animate-pulse"></div>

      <div className="absolute top-[4rem] right-[-6rem] w-40 h-40 sm:w-56 sm:h-56 bg-violet-600/30 rounded-full filter blur-2xl opacity-50 animate-pulse"></div>

      

      {/* Section heading */}
      <h2 className="relative z-10 text-gray-300 text-lg sm:text-xl font-semibold mb-12 text-center max-w-2xl">
        Learn cutting-edge technologies from world-class{" "}
        <span className="text-cyan-400">mentors</span>, anytime, anywhere.
      </h2>

      {/* Icons row */}
      <div className="relative z-10 flex flex-wrap justify-center gap-12">
        {icons.map((item, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Tooltip */}
            <div
              className={`pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 z-20 transition-all duration-300 ${
                hoveredIndex === index
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-1"
              }`}
            >
              <span className="relative bg-black/90 text-white whitespace-nowrap text-[18px] px-3 py-1 rounded-lg shadow-lg">
                {item.label}
                {/* Glow underline */}
                <span
                  className="absolute left-1/2 -bottom-1 -translate-x-1/2 rounded-full"
                  style={{
                    width: 40,
                    height: 6,
                    background: item.color,
                    filter: "blur(6px)",
                    opacity: 0.7,
                  }}
                />
              </span>
            </div>

            {/* Icon + radial glow */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
              {/* Radial glow */}
              <div
                className="absolute rounded-full transition-all duration-500 opacity-60 group-hover:opacity-100"
                style={{
                  width: "140%",
                  height: "140%",
                  background: `radial-gradient(circle at center, ${item.color} 0%, rgba(0,0,0,0) 45%)`,
                  filter: "blur(28px)",
                }}
              />
              {/* Icon */}
              <div className="relative z-10 text-3xl transition-transform duration-300 group-hover:scale-110">
                {React.cloneElement(item.icon, { size: 36, color: item.color })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
