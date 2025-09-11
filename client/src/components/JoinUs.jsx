import React from "react";
import LightRays from "./LightRays"; // adjust the import path if needed

function JoinUs() {
  return (
    <section className="relative translate-y-[350px] md:translate-y-[0px] w-full h-[80vh] md:h-[100vh] flex flex-col items-center justify-center bg-black text-white px-6 text-center overflow-hidden z-20">
      
      {/* Light rays background */}
      <LightRays
        className="absolute inset-0 z-0 pointer-events-none"
        raysOrigin="top-center"
        raysColor="#ffffff"
        raysSpeed={1}
        lightSpread={1}
        rayLength={10}
        pulsating={true}
        fadeDistance={0.9}
        saturation={1}
        followMouse={true}
        mouseInfluence={0.15}
        noiseAmount={0.05}
        distortion={0.05}
      />

      {/* Content */}
      <div className="relative translate-y-[-250px] max-w-4xl pt-20 md:pt-40 mx-auto z-10">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-tight"
          style={{
            background:
              "linear-gradient(to bottom, #ffffff 0%, #cccccc 40%, #999999 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 14px 20px rgba(0,0,0,0.85)",
          }}
        >
          What are you waiting for?
        </h2>
        <p
          className="mb-10 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
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
          className="px-8 py-4 rounded-md bg-[#00ffff] text-black font-semibold text-base md:text-lg 
                     hover:shadow-[0_0_40px_rgba(255,255,255,0.8)] 
                     hover:bg-black hover:border hover:text-white transition duration-300"
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
