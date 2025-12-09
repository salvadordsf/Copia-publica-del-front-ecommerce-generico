"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";
import "swiper/swiper.css";

export const MainHeroCarousel = () => {
  return (
    <Swiper
      modules={[Autoplay, A11y]}
      autoplay={{
        delay: 8000,
      }}
      a11y={{
        prevSlideMessage: "Previa imagen de carrusel",
        nextSlideMessage: "Próxima imagen de carrusel",
      }}
      loop={true}
      spaceBetween={0}
      slidesPerView={1}
    >
      {[1,2,3].map((banner, i) => (
      <SwiperSlide key={`main-carousel-poster-${i}`}>
        <div className="h-64 bg-neutral-300 flex items-center justify-center text-white text-3xl shadow-lg">
          Banner {banner}
        </div>
      </SwiperSlide>
      ))}
    </Swiper>
  );
};
