import React from "react";

export default function Community() {
  return (
    <section className="relative w-full h-[100vh] bg-black text-white flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-16">
      {/* Left Content */}
      <div className="flex-1 text-center md:text-left z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-8">
          Global Community <br /> <span className="text-cyan-400">Learner Network</span>
        </h2>

        <p className="text-gray-300 text-left mb-6 max-w-lg mx-auto md:mx-0 text-xl md:text-lg ">
            Join a thriving global network of learners and mentors, with members from 195+ countries, actively collaborating, sharing knowledge, and growing together.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-lg mx-auto md:mx-0 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center shadow-md">
            <p className="text-gray-300 text-lg">Members</p>
            <h3 className="text-2xl font-bold text-white">1,234,567</h3>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center shadow-md">
            <p className="text-gray-300 text-lg">Active Learners</p>
            <h3 className="text-2xl font-bold text-white">456,789</h3>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center shadow-md">
            <p className="text-gray-300 text-lg">Countries</p>
            <h3 className="text-2xl font-bold text-white">195</h3>
          </div>
        </div>

        <button className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300">
          Become a Member
        </button>
      </div>

      {/* Right Content - Globe */}
      <div className="flex-1 flex justify-center relative mt-12 md:mt-0">
        {/* Glowing Gradient Background */}
        <div className="absolute w-80 h-80 md:w-[28rem] md:h-[28rem] bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

        {/* Globe Image (replace with 3D / animated globe if needed) */}
        <img
          src="/assets/globe.png"
          alt="Global Network"
          className="relative w-64 md:w-80 animate-pulse rounded-full"
        />
      </div>
    </section>
  );
}
