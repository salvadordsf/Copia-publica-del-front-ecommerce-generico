import { Skeleton } from "@/components/ui/skeleton";
import { ProductCarouselSkeleton } from "../products/product-carousel-skeleton";
import { ProductGridSkeleton } from "../products/products-results-container-skeleton";
import { CategoryCarouselSkeleton } from "../categories/category-carousel-skeleton";

export const HomePageSkeleton = () => {
  return (
    <div>
      <Skeleton className="w-full h-[300px] md:h-[400px] rounded-none" />

      <div className="max-w-7xl xl:mx-auto sm:px-1 md:px-5 flex flex-col gap-5">
        <CategoryCarouselSkeleton />

        <ProductCarouselSkeleton />
        <ProductCarouselSkeleton />
        <ProductCarouselSkeleton />
        
        <ProductGridSkeleton showTitle={true} className="mt-10" count={12} />
      </div>
    </div>
  );
};