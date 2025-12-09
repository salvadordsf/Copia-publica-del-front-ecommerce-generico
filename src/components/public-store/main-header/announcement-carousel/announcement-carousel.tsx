"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export const AnnouncementCarousel = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 7000,
      }}
      loop={true}
      spaceBetween={0}
      slidesPerView={1}
    >
      {[1, 2, 3].map((Announcement, i) => (
        <SwiperSlide key={`announce-poster-${i}`}>
          <div className="h-8 bg-black flex items-center justify-center text-white shadow-lg">
            Announcement {Announcement}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
