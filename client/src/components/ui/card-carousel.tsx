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
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-5 shadow-xl w-[280px] sm:w-[320px] flex flex-col items-center justify-end text-left transform transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40">
                      {/* Thumbnail */}
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 border-cyan-400 shadow-md mb-4">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Title clickable */}
                      <button
                        onClick={() => onNavigate?.(course._id)}
                        className="text-lg hover:text-cyan-400 sm:text-xl font-semibold text-white mb-2"
                      >
                        {course.title}
                      </button>

                      {/* Description */}
                      <p className="text-gray-300 text-sm sm:text-base line-clamp-3">
                        {course.description}
                      </p>
                      <p className="text-cyan-400 text-sm sm:text-base line-clamp-3">By : {course.instructorId.fullName}</p>

                      {/* Separator */}
                      <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full my-3"></div>
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
