"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation } from "swiper/modules";
import "swiper/swiper.css";
import "swiper/css/navigation";
import { ReactElement } from "react";
import { GenericItemsCard } from "./generic-items-card";
import { GenericNextSliderBtn } from "./generic-next-slider";
import { GenericPrevSliderBtn } from "./generic-prev-slider";

interface IGenericItemsSliderProps {
  itemsType: string;
  items: [item: { id: string }, ReactElement][];
  title?: string;
  btns?: {
    prev: string;
    next: string;
  };
  slidesSpaceConfig?: {
    slidesPerView?: number | "auto";
    spaceBetween?: number;
    breakpoints?: {
      [breakpoint: number]: {
        slidesPerView?: number | "auto";
        spaceBetween?: number;
      };
    };
  };
}

export const GenericItemsSlider = ({
  itemsType,
  items,
  title,
  btns,
  slidesSpaceConfig,
}: IGenericItemsSliderProps) => {
  const config = {
    slidesPerView: slidesSpaceConfig?.slidesPerView || 1,
    spaceBetween: slidesSpaceConfig?.spaceBetween || 0,
    breakpoints: slidesSpaceConfig?.breakpoints || {},
  };

  return (
    <div className="p-2">
      {title && <h3 className="pb-2 font-semibold">{title}</h3>}
      <div className="relative">
        {btns && <GenericPrevSliderBtn id={btns.prev} />}
        <Swiper
          modules={[A11y, Navigation]}
          a11y={{
            prevSlideMessage: `${itemsType} anterior`,
            nextSlideMessage: `${itemsType} siguiente`,
          }}
          navigation={{
            nextEl: `#${btns?.next}`,
            prevEl: `#${btns?.prev}`,
          }}
          slidesPerView={config.slidesPerView}
          spaceBetween={config.spaceBetween}
          breakpoints={config.breakpoints}
        >
          {items.map(([item, element]) => (
            <SwiperSlide key={`${itemsType}-${item.id}`}>
              <GenericItemsCard>{element}</GenericItemsCard>
            </SwiperSlide>
          ))}
        </Swiper>
        {btns && <GenericNextSliderBtn id={btns.next} />}
      </div>
    </div>
  );
};
