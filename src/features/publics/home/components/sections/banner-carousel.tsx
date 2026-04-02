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
            <div className="relative w-full h-full">
              {/* blur bg with the same image */}
              <Image
                src={item.imageUrl!}
                alt=""
                fill
                className="object-cover scale-110 blur-xl brightness-75 select-none"
                sizes="100vw"
                aria-hidden
                priority
              />

              {/* Main image */}
              <Image
                src={item.imageUrl!}
                alt={item.title ?? `Banner ${index + 1}`}
                fill
                className="object-contain select-none"
                sizes="100vw"
                priority={index === 0}
                decoding="async"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent pointer-events-none" />

              {/* Text */}
              {(item.title || item.subtitle) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-3 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />

                  <div className="relative z-10 flex flex-col items-center gap-3 max-w-3xl">

                    {item.title && (
                      <h2 className="text-white text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight tracking-tight drop-shadow-lg">
                        {item.title}
                      </h2>
                    )}

                    <div className="w-12 h-px bg-white/50 mt-1" />
                    {item.subtitle && (
                      <p className="text-white/70 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase drop-shadow">
                        {item.subtitle}
                      </p>
                    )}

                    {item.linkUrl && (
                      <span className="mt-2 inline-block text-xs sm:text-sm font-medium text-white border border-white/50 rounded-full px-6 py-2 backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-colors">
                        Ver más
                      </span>
                    )}
                  </div>
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
