import React, { useState, useRef, useEffect } from 'react';
import { Code, Bot, BarChart3, Cloud, PenTool, BrainCircuit } from 'lucide-react';

// --- CATEGORY DATA (No changes here) ---
const categories = [
  { name: 'Web Development', icon: <Code size={40} /> },
  { name: 'AI/ML', icon: <BrainCircuit size={40} /> },
  { name: 'Data Science', icon: <BarChart3 size={40} /> },
  { name: 'Cloud', icon: <Cloud size={40} /> },
  { name: 'Design', icon: <PenTool size={40} /> },
  { name: 'GenAI', icon: <Bot size={40} /> },
];

// --- UPDATED INDIVIDUAL CARD COMPONENT ---
// This version adds an interactive spotlight that follows the mouse
const CategoryCard = ({ icon, name }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: -100, y: -100 });
  };

  const cardStyle = {
    '--mouse-x': `${mousePosition.x}px`,
    '--mouse-y': `${mousePosition.y}px`,
  };

  return (
    <a
      href="#"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={cardStyle}
      className="
        group 
        relative 
        flex flex-col items-center justify-center 
        w-full h-48 
        p-6 
        bg-gray-900/40
        border border-white/10 
        rounded-3xl 
        backdrop-blur-xl 
        text-white 
        text-center 
        transition-all duration-300 
        hover:border-white/20
        hover:-translate-y-2
        overflow-hidden
      "
    >
      {/* Interactive Spotlight Effect */}
      <div 
        className="
          absolute inset-0 
          bg-radial-gradient-spotlight 
          opacity-0 
          group-hover:opacity-100 
          transition-opacity duration-300
        "
      />
      
      <div className="relative z-10 text-gray-300 transition-colors duration-300 group-hover:text-white">
        {icon}
      </div>
      <h3 className="relative z-10 mt-4 font-semibold text-lg text-gray-200 transition-colors duration-300 group-hover:text-white">
        {name}
      </h3>
    </a>
  );
};

// --- MAIN SECTION COMPONENT ---
function PopularCategories() {
  return (
    <div className="w-full">
      <section className="relative w-full min-h-screen bg-black text-white flex items-center justify-center py-20 px-4 overflow-hidden">
        
        {/* Updated Background Gradient Blobs */}
        <div className="absolute top-[-10rem] left-[-10rem] w-96 h-96 bg-cyan-500/40 rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute top-[-10rem] right-[-10rem] w-96 h-96 bg-purple-600/40 rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-5rem] left-1/4 w-96 h-96 bg-pink-500/40 rounded-full filter blur-3xl opacity-50"></div>

        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <h2 className="text-center text-4xl sm:text-5xl font-bold mb-12">
            Popular <span className='text-cyan-400'>Categories</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.name} icon={category.icon} name={category.name} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default PopularCategories;