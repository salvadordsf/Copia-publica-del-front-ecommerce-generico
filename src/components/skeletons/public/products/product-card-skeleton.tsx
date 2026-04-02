import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const ProductCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "relative h-full flex flex-col overflow-hidden rounded-2xl bg-white",
        "border border-neutral-100 shadow-sm",
        "mx-auto w-full max-w-[150px] sm:max-w-[150px] lg:max-w-[170px] xl:max-w-[200px]",
        className
      )}
    >
      {/* Image */}
      <Skeleton className="w-full aspect-square rounded-none" />

      {/* Content */}
      <div className="flex flex-col gap-2 px-3 py-2.5">
        <Skeleton className="h-3 w-full rounded-md" />
        <Skeleton className="h-3 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-1/2 rounded-md mt-1" />
      </div>
    </div>
  );
};