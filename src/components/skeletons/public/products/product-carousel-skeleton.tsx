import { GenericItemsSliderSkeleton } from "../generics/generic-items-slider-skeleton";
import { ProductCardSkeleton } from "./product-card-skeleton";

export const ProductCarouselSkeleton = () => {
  return (
    <GenericItemsSliderSkeleton
      itemSkeleton={<ProductCardSkeleton />}
      count={5}
    />
  );
};
