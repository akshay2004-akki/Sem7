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

interface CarouselProps {
  courses: {
    id: string | number;
    title: string;
    description: string;
    thumbnail: string;
    price?: number;
    currency?: string;
  }[];
  autoplayDelay?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
  onNavigate?: (id: string | number) => void;
  carouselId: string; // unique ID per carousel
}

export const CardCarousel: React.FC<CarouselProps> = ({
  courses,
  autoplayDelay = 2000,
  showPagination = true,
  showNavigation = true,
  onNavigate,
  carouselId,
}) => {
  return (
    <section className="w-full py-6">
      <div className="mx-auto w-full max-w-6xl rounded-[24px] p-4 shadow-md bg-neutral-900/50">
        <div className="relative w-full flex flex-col items-center">
          <Swiper
            key={carouselId} // 👈 ensures independent re-init
            id={`swiper-${carouselId}`} // 👈 unique DOM id
            spaceBetween={20}
            autoplay={{
              delay: autoplayDelay,
              disableOnInteraction: false,
              pauseOnMouseEnter: true, // 👈 pause on hover, resume on leave
            }}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            loop={true} // 👈 keeps infinite loop
            slidesPerView={3}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 5,
              depth: 120,
              modifier: 2,
              slideShadows: false,
            }}
            pagination={
              showPagination
                ? { clickable: true, el: `.swiper-pagination-${carouselId}` }
                : false
            }
            navigation={
              showNavigation
                ? {
                    nextEl: `.swiper-button-next-${carouselId}`,
                    prevEl: `.swiper-button-prev-${carouselId}`,
                  }
                : undefined
            }
            modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
            className="w-full relative"
          >
            {courses.map((course) => (
              <SwiperSlide key={course.id}>
                <div
                  onClick={() => onNavigate?.(course.id)}
                  className="cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl w-[280px] sm:w-[320px] flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40"
                >
                  {/* Image */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 border-cyan-400 shadow-md mb-4">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 line-clamp-2">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm sm:text-base line-clamp-3">
                    {course.description}
                  </p>

                  {/* Price */}
                  {course.price && (
                    <span className="mt-3 text-cyan-300 font-semibold">
                      {course.currency} {course.price}
                    </span>
                  )}
                </div>
              </SwiperSlide>
            ))}

            {/* Navigation buttons inside Swiper */}
            {showNavigation && (
              <>
                <button
                  className={`swiper-button-prev-${carouselId} absolute top-1/2 -translate-y-1/2 left-2 z-10 bg-black/40 hover:bg-cyan-500/70 text-white p-2 rounded-full shadow-md`}
                >
                  ⬅
                </button>
                <button
                  className={`swiper-button-next-${carouselId} absolute top-1/2 -translate-y-1/2 right-2 z-10 bg-black/40 hover:bg-cyan-500/70 text-white p-2 rounded-full shadow-md`}
                >
                  ➡
                </button>
              </>
            )}
          </Swiper>

          {/* Pagination dots */}
          {showPagination && (
            <div
              className={`swiper-pagination-${carouselId} mt-6 flex justify-center`}
            />
          )}
        </div>
      </div>
    </section>
  );
};
