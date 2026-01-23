"use client";

import React from "react";
import { HomeSection } from "@/types/resources/home-section-types";
import { ProductCard } from "@/components/public-store/home/cards/product-card";
import { GenericItemsSlider } from "@/components/public-store/items-slider/generic-items-slider";

interface ProductCarouselProps {
  section: HomeSection;
}

export const ProductCarousel = ({ section }: ProductCarouselProps) => {
  const products = React.useMemo(() => {
    if (!section.items) return [];

    return section.items
      .filter(
        (item) =>
          item.itemType === "PRODUCT" && item.product && item.product.stock > 0
      )
      .sort((a, b) => b.product.relevance - a.product.relevance);
  }, [section.items]);

  if (!products.length) return null;

  return (
    <section className="my-2">
      <GenericItemsSlider
        title={section.title ?? "Productos destacados"}
        itemsType="producto"
        btns={{
          prev: `swiper-prev-btn-section-${section.id}`,
          next: `swiper-next-btn-section-${section.id}`,
        }}
        slidesSpaceConfig={{
          slidesPerView: 2,
          spaceBetween: 5,
          breakpoints: {
            400: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
            480: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 3,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 3,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 3,
            },
          },
        }}
        items={products.map((item) => [
          item.product,
          <ProductCard key={item.id} product={item.product} />,
        ])}
      />
    </section>
  );
};
