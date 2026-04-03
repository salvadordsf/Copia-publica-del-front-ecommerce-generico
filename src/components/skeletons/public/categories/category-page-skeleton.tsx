import { Skeleton } from "@/components/ui/skeleton";
import { GenericItemsSliderSkeleton } from "../generics/generic-items-slider-skeleton";
import { ProductGridSkeleton } from "../products/products-results-container-skeleton";

export const CategoryPageSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">

      {/* Breadcrumb */}
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-3 w-16 rounded-md" />
          <Skeleton className="h-3 w-3 rounded-sm" />
          <Skeleton className="h-3 w-24 rounded-md" />
        </div>
        <Skeleton className="h-9 w-56 rounded-md" />
        <Skeleton className="h-px w-10 rounded-none" />
      </header>

      {/* Subcategories */}
      <section>
        <GenericItemsSliderSkeleton
          itemSkeleton={<Skeleton className="h-10 w-full rounded-xl" />}
          count={5}
          showBtns={false}
        />
      </section>

      {/* Products */}
      <section className="space-y-4">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3 w-16 rounded-md" />
          <Skeleton className="h-6 w-28 rounded-md" />
          <Skeleton className="h-px w-8 rounded-none" />
        </div>
        <ProductGridSkeleton count={8} />
      </section>

    </div>
  );
};