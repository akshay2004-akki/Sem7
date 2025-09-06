import React from "react";

function JoinUs() {
  return (
    <section className="relative w-full h-[80vh] md:h-[100vh] flex flex-col items-center justify-center bg-black text-white py-16 md:py-24 px-6 text-center overflow-hidden">
      {/* Lamp fixture (housing + glow) */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
        {/* Lamp cord */}
        <div className="w-1 h-10 bg-black" />
        {/* Lamp head */}
        <div className="relative w-20 h-10 z-20 bg-black rounded-b-full rotate-180 shadow-[0_8px_15px_rgba(0,0,0,0.6)]" />
        {/* Bulb */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[60px] w-8 h-8 rounded-full bg-white shadow-[0_20px_100px_20px_rgba(255,255,255,0.6)] -z-20" />
      </div>

      {/* Spotlight beam effect */}
      <div className="absolute top-48 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div
          className="absolute left-1/2 -translate-x-1/2 
                     w-[800px] h-[800px] 
                     bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.15)_30%,transparent_80%)] 
                     blur-[100px]"
        />
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight"
          style={{
            background: "linear-gradient(to bottom, #ffffff 0%, #cccccc 40%, #999999 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 14px 20px rgba(0,0,0,0.85)",
          }}
        >
          What are you waiting for?
        </h2>
        <p
          className="mb-10 max-w-2xl mx-auto text-base sm:text-lg"
          style={{
            background: "linear-gradient(to bottom, #eeeeee 0%, #aaaaaa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 10px 16px rgba(0,0,0,0.75)",
          }}
        >
          Join thousands of learners today and start building skills that matter.
        </p>
        <button
          className="px-8 py-4 rounded-md bg-white text-black font-semibold text-base md:text-lg 
                      hover:shadow-[0_0_40px_rgba(255,255,255,0.8)] 
                     hover:bg-gray-200 transition duration-300"
          style={{
            boxShadow:
              "0 14px 24px rgba(0,0,0,0.65), 0 0 25px rgba(255,255,255,0.6)",
          }}
        >
          🚀 Get Started
        </button>
      </div>
    </section>
  );
}

export default JoinUs;
