import { GenericItemsSliderSkeleton } from "../generics/generic-items-slider-skeleton";
import { CategoryHomeCardSkeleton } from "./category-home-card-skeleton";

export const CategoryCarouselSkeleton = () => {
  return (
    <GenericItemsSliderSkeleton
      itemSkeleton={<CategoryHomeCardSkeleton />}
      count={7}
      showBtns={false}
    />
  );
};
