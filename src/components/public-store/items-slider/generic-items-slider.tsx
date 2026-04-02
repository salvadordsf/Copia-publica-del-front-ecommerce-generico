"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { ReactElement } from "react";
import { GenericItemsCard } from "./generic-items-card";
import { GenericNextSliderBtn } from "./generic-next-slider";
import { GenericPrevSliderBtn } from "./generic-prev-slider";
import { cn } from "@/lib/utils";
import "swiper/swiper.css";
import "swiper/css/navigation";

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
  paginationDots?: boolean;
  isHomePageSlider?: boolean;
}

export const GenericItemsSlider = ({
  isHomePageSlider = false,
  itemsType,
  items,
  title,
  btns,
  slidesSpaceConfig,
  paginationDots = false,
}: IGenericItemsSliderProps) => {
  const config = {
    slidesPerView: slidesSpaceConfig?.slidesPerView || 1,
    spaceBetween: slidesSpaceConfig?.spaceBetween || 0,
    breakpoints: slidesSpaceConfig?.breakpoints || {},
  };

  return (
    <div className="p-2">
      {title && (
        <div
          className={cn(
            "flex flex-col gap-1",
            isHomePageSlider ? "pb-6" : "pb-2",
          )}
        >
          <h3
            className={cn(
              isHomePageSlider
                ? "text-2xl font-semibold tracking-tight text-neutral-900"
                : "text-sm font-medium text-neutral-500",
            )}
          >
            {title}
          </h3>
          {isHomePageSlider && <div className="h-px w-8 bg-neutral-300" />}
        </div>
      )}
      <div className={cn(itemsType === "producto" ? "relative flex" : "relative")}>
        {btns && <GenericPrevSliderBtn id={btns.prev} />}
        <Swiper
          modules={[A11y, Navigation, Pagination]}
          a11y={{
            prevSlideMessage: `${itemsType} anterior`,
            nextSlideMessage: `${itemsType} siguiente`,
          }}
          navigation={{
            nextEl: `#${btns?.next}`,
            prevEl: `#${btns?.prev}`,
          }}
          pagination={paginationDots}
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
