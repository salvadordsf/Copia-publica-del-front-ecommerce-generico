"use client";

import React from "react";
import { HomeSection } from "@/types/resources/home-section-types";
import { GenericItemsSlider } from "@/components/public-store/items-slider/generic-items-slider";
import { CategoryCard } from "@/components/public-store/home/cards/categorie-card";

interface CategoriesCarouselProps {
  section: HomeSection;
}

export const CategoriesCarousel = ({ section }: CategoriesCarouselProps) => {
  const categories = React.useMemo(() => {
    if (!section.items) return [];

    return section.items
      .filter(
        (item) =>
          item.itemType === "CATEGORY" &&
          item.category &&
          item.category.status === "ACTIVE"
      )
      .sort((a, b) => a.position - b.position);
  }, [section.items]);

  if (!categories.length) return null;

  return (
    <section className="my-2">
      <GenericItemsSlider
        isHomePageSlider={true}
        title={section.title ?? "Categorías"}
        itemsType="categoría"
        btns={{
          prev: `swiper-prev-btn-section-${section.id}`,
          next: `swiper-next-btn-section-${section.id}`,
        }}
        slidesSpaceConfig={{
          slidesPerView: 3,
          spaceBetween: 4,
          breakpoints: {
            400: {
              slidesPerView: 4,
              spaceBetween: 5,
            },
            480: {
              slidesPerView: 4,
              spaceBetween: 5,
            },
            650: {
              slidesPerView: 5,
              spaceBetween: 5,
            },
            768: {
              slidesPerView: 6,
              spaceBetween: 5,
            },
            1024: {
              slidesPerView: 8,
              spaceBetween: 5,
            },
            1280: {
              slidesPerView: 10,
              spaceBetween: 5,
            },
          },
        }}
        items={categories.map((item) => [
          item.category,
          <CategoryCard key={item.id} category={item.category} />,
        ])}
      />
    </section>
  );
};
