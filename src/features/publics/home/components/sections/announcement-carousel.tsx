"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import { HomeSection } from "@/types/resources/home-section-types";
import Link from "next/link";

interface AnnouncementCarouselProps {
  section: HomeSection;
}

export const AnnouncementCarousel = ({
  section,
}: AnnouncementCarouselProps) => {
  return (
    <div className="relative w-full border-b border-neutral-200 bg-neutral-900">
      <Swiper
        modules={[Autoplay, A11y]}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
        spaceBetween={0}
        a11y={{
          prevSlideMessage: "Anuncio anterior",
          nextSlideMessage: "Próximo anuncio",
        }}
        className="h-9"
      >
        {section.items.map((item) => {
          const content = (
            <span className="truncate text-xs tracking-wide text-neutral-100 font-semibold">
              {item.title!.toUpperCase()}
            </span>
          );

          return (
            <SwiperSlide key={item.id}>
              <div className="flex h-9 items-center justify-center px-4">
                {item.linkUrl ? (
                  <Link
                    href={item.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-80"
                  >
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
