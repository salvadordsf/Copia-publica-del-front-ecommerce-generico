import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardSkeleton } from "./product-card-skeleton";

interface ProductGridSkeletonProps {
  count?: number;
  className?: string;
  showTitle?: boolean;
}

export const ProductGridSkeleton = ({
  count = 8,
  className = "",
  showTitle = false,
}: ProductGridSkeletonProps) => {
  return (
    <section className={className}>
      {showTitle && showTitle && (
        <div className="flex flex-col gap-1 pb-6">
          <Skeleton className="h-7 w-48 rounded-md" />
          <Skeleton className="h-px w-8 rounded-none" />
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
        {Array.from({ length: count }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
};
