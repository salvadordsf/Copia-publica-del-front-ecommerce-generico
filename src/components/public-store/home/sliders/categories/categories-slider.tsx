"use client";

import { useCategories } from "@/features/categories/services/categories-querys";
import { GenericItemsSlider } from "../../../items-slider/generic-items-slider";
import { useEffect } from "react";
import { CategoryCard } from "./categorie-card";

export const CategoriesSlider = () => {
  const { data, isLoading, isError } = useCategories({
    status: "ACTIVE",
  });
  useEffect(() => console.log(data), [data]);

  if (isLoading) return <p>Cargando categorias</p>;
  if (isError) return <p>Error categorias</p>;
  return (
    <div>
      <GenericItemsSlider
        title="Categorías"
        itemsType="producto"
        btns={{
          prev: "swiper-prev-btn-home-categories",
          next: "swiper-next-btn-home-categories",
        }}
        slidesSpaceConfig={{
          slidesPerView: 2,
          spaceBetween: 3,
          breakpoints: {
            425: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 3,
            },
            1024: {
              slidesPerView: 9,
              spaceBetween: 12,
            },
          },
        }}
        items={[...data.data]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((cat: { id: string; name: string }) => {
            return [cat, <CategoryCard category={cat} />];
          })}
      />
    </div>
  );
};
