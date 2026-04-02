import { Skeleton } from "@/components/ui/skeleton";
import { ProductCarouselSkeleton } from "../products/product-carousel-skeleton";

export const HomePageSkeleton = () => {
  return (
    <div className="">
      <Skeleton className="w-full h-[300px] md:h-[400px] rounded-none" />

      <div className="max-w-7xl xl:mx-auto sm:px-1 md:px-5 flex flex-col gap-5">
        <ProductCarouselSkeleton />
        <ProductCarouselSkeleton />
        <ProductCarouselSkeleton />
      </div>
    </div>
  );
};