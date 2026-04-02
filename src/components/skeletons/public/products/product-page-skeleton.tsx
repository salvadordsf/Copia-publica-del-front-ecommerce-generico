import { Skeleton } from "@/components/ui/skeleton";
import { ProductCarouselSkeleton } from "./product-carousel-skeleton";

export const ProductPageSkeleton = () => {
  return (
    <main className="flex flex-col gap-8 px-4 py-6 md:px-8 max-w-3xl m-auto">
      {/* TOP SECTION */}
      <section className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-10 max-w-70 md:max-w-3xl mx-auto w-full">
        {/* Image */}
        <Skeleton className="w-full max-w-sm mx-auto md:max-w-none aspect-square rounded-xl" />

        {/* Info */}
        <div className="flex flex-col gap-6 pt-6">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-full rounded-md" />
            <Skeleton className="h-6 w-3/4 rounded-md" />
          </div>

          {/* Price */}
          <Skeleton className="h-9 w-32 rounded-md" />

          <div className="flex flex-col gap-4 pt-4">
            {/* Quantity selector */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-32 rounded-lg" />
              <Skeleton className="h-4 w-36 rounded-md" />
            </div>

            {/* Add to cart btn */}
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="flex flex-col gap-2">
        <Skeleton className="h-5 w-28 rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-2/3 rounded-md" />
      </section>

      {/* Related products */}
      <article className="mt-6">
        <ProductCarouselSkeleton />
      </article>
    </main>
  );
};
