import React from "react";
import MagicBento from "./MagicBento";
import {
  Code,
  Bot,
  BarChart3,
  Cloud,
  PenTool,
  BrainCircuit,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";
const categories = [
  {
    label: "Frontend",
    title: "Web Development",
    description: "Build websites and apps",
    icon: <Code size={40} />,
  },
  {
    label: "AI/ML",
    title: "Artificial Intelligence",
    description: "Learn machine learning & AI",
    icon: <BrainCircuit size={40} />,
  },
  {
    label: "Data",
    title: "Data Science",
    description: "Analyze data & visualize insights",
    icon: <BarChart3 size={40} />,
  },
  {
    label: "Cloud",
    title: "Cloud Computing",
    description: "Scale apps with cloud infra",
    icon: <Cloud size={40} />,
  },
  {
    label: "Design",
    title: "UI/UX Design",
    description: "Craft beautiful user experiences",
    icon: <PenTool size={40} />,
  },
  {
    label: "GenAI",
    title: "Generative AI",
    description: "Explore LLMs and creative AI",
    icon: <Bot size={40} />,
  },
];

function PopularCategories() {
  return (
    <div className="w-full">
      <section className="relative w-full min-h-screen bg-black text-white flex items-center justify-center py-20 px-4 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-[-10rem] left-[-10rem] w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/40 rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute top-[-10rem] right-[-10rem] w-64 h-64 sm:w-96 sm:h-96 bg-purple-600/40 rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-5rem] left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-pink-500/40 rounded-full filter blur-3xl opacity-50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl mx-auto">
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={20}
            blurStrength={20}
          >
            <h2 className="text-center text-4xl sm:text-5xl font-bold mb-12">
              Popular <span className="text-cyan-400">Categories</span>
            </h2>
          </ScrollReveal>
          <MagicBento
            cards={categories} // 👈 pass categories
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            spotlightRadius={300}
            particleCount={12}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            glowColor="132,0,255"
            />
        </div>
      </section>
    </div>
  );
}

export default PopularCategories;
