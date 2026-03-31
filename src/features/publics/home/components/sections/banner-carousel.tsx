"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";
import "swiper/swiper.css";

import { HomeSection } from "@/types/resources/home-section-types";
import Image from "next/image";

interface BannerCarouselProps {
  section: HomeSection;
}

export const BannerCarousel = ({ section }: BannerCarouselProps) => {
  const items =
    section.items
      ?.filter((item) => Boolean(item.imageUrl))
      .sort((a, b) => a.position - b.position) ?? [];

  if (!items.length) return null;

  return (
    <section className="">
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
        className="w-full h-64 sm:h-80 lg:h-[400px] overflow-hidden"
      >
        {items.map((item, index) => {
          const banner = (
            <div className="w-full h-full flex items-center justify-center">
              {/* Image */}
              <Image
                src={item.imageUrl!}
                alt={item.title ?? `Banner ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="
                  h-full
                  w-auto
                  max-w-full
                  object-contain
                  select-none
                "
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent pointer-events-none" />

              {/* Text */}
              {(item.title || item.subtitle) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 gap-2 pointer-events-none">
                  {item.title && (
                    <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold drop-shadow">
                      {item.title}
                    </h2>
                  )}

                  {item.subtitle && (
                    <p className="text-white/90 text-sm sm:text-base max-w-2xl drop-shadow">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              )}
            </div>
          );

          return (
            <SwiperSlide key={item.id}>
              {item.linkUrl ? (
                <a
                  href={item.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block focus:outline-none"
                >
                  {banner}
                </a>
              ) : (
                banner
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};
