"use client";

import { useProducts } from "@/features/products/services/products-querys";
import { GenericItemsSlider } from "../../../items-slider/generic-items-slider";
import { ProductCard } from "@/components/public-store/product-card/product-card";

export const RelevantProductsSlider = () => {
  const { data, isLoading, isError } = useProducts({
    status: "ACTIVE",
    sortBy: "relevance",
    sortOrder: "desc",
  });

  if (isLoading) return <p>Cargando productos relevantes</p>;
  if (isError) return <p>Error productos relevantes</p>;

  return (
    <div>
      <GenericItemsSlider
        title="Prductos destacados"
        itemsType="producto"
        btns={{
          prev: "swiper-prev-btn-home-relevants-products",
          next: "swiper-next-btn-home-relevants-products",
        }}
        slidesSpaceConfig={{
          slidesPerView: 1,
          spaceBetween: 10,
          breakpoints: {
            425: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 40,
            },
          },
        }}
        items={[...data.data.data]
          .filter((p) => p.stock)
          .map(
            (product: {
              id: string;
              name: string;
              price: number;
              stock: number;
            }) => {
              return [product, <ProductCard product={product} />];
            }
          )}
      />
    </div>
  );
};
