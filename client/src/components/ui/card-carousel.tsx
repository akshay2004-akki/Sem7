import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";

import { Badge } from "@/components/ui/badge";

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructorId: {
    fullName: string;
  };
}

interface CarouselProps {
  courses: Course[];
  autoplayDelay?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
  onNavigate?: (courseId: string) => void;
}

export const CardCarousel: React.FC<CarouselProps> = ({
  courses,
  autoplayDelay = 1500,
  showPagination = true,
  showNavigation = true,
  onNavigate,
}) => {
  const css = `
    .swiper {
      width: 100%;
      padding-bottom: 50px;
    }
    .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 300px;
    }
    .swiper-slide img {
      display: block;
      width: 100%;
    }
    .swiper-3d .swiper-slide-shadow-left,
    .swiper-3d .swiper-slide-shadow-right {
      background: none;
    }
  `;

  return (
    <section>
      <style>{css}</style>
      <div className="mx-auto w-full max-w-4xl rounded-[24px] border border-black/5 p-2 shadow-sm md:rounded-t-[44px]">
        <div className="relative mx-auto flex w-full flex-col rounded-[24px] border-none bg-neutral-800/5 p-2 shadow-sm md:items-start md:gap-8 md:rounded-b-[20px] md:rounded-t-[40px] md:p-2">
          <Badge
            variant="outline"
            className="absolute left-4 top-6 rounded-[14px] border border-black/10 text-base md:left-6"
          />

          <div className="flex w-full items-center justify-center gap-4">
            <div className="w-full">
              <Swiper
                spaceBetween={100}
                autoplay={{
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                }}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 3,
                  depth: 100,
                  modifier: 2.5,
                  slideShadows: false,
                }}
                pagination={showPagination}
                navigation={
                  showNavigation
                    ? {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      }
                    : undefined
                }
                modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
              >
                {courses.map((course) => (
                  <SwiperSlide key={course._id}>
                    <div
                      className="
      bg-white/10 backdrop-blur-xl border border-white/20 
      rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.25)]
      w-[280px] sm:w-[320px] flex flex-col items-center
      transform transition-all duration-500 hover:scale-[1.06]
      hover:shadow-[0_12px_40px_rgba(56,189,248,0.35)] hover:border-cyan-300/40
    "
                    >
                      {/* Centered Image */}
                      <div
                        className="
        w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden 
        border border-white/20 shadow-md mb-4 
        bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20 
        backdrop-blur-lg
      "
                      >
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* LEFT-ALIGNED TEXT */}
                      <div className="w-full text-left">
                        <button
                          onClick={() => onNavigate?.(course._id)}
                          className="
          text-xl sm:text-2xl font-semibold text-white mb-2 
          tracking-tight hover:text-cyan-300 transition-colors duration-300
        "
                        >
                          {course.title}
                        </button>

                        <p className="text-gray-200/80 text-sm sm:text-base leading-relaxed line-clamp-3">
                          {course.description.slice(0,50)}...
                        </p>

                        <p className="text-sm sm:text-base mt-1 italic">
                          <span className="text-cyan-300">Instructor : </span><span className="text-white">{course.instructorId.fullName}</span>
                        </p>

                        <div
                          className="
          w-16 h-[3px] bg-gradient-to-r from-cyan-400 to-pink-500 
          rounded-full my-4 shadow-[0_0_8px_rgba(56,189,248,0.5)]
        "
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
