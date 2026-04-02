import { Skeleton } from "@/components/ui/skeleton";
import { ReactElement } from "react";

interface GenericItemsSliderSkeletonProps {
  itemSkeleton: ReactElement;
  count?: number;
  showTitle?: boolean;
  showBtns?: boolean;
}

export const GenericItemsSliderSkeleton = ({
  itemSkeleton,
  count = 5,
  showTitle = true,
  showBtns = true,
}: GenericItemsSliderSkeletonProps) => {
  return (
    <div className="p-2">
      {showTitle && (
        <div className="flex flex-col gap-1 pb-6">
          <Skeleton className="h-7 w-48 rounded-md" />
          <Skeleton className="h-px w-8 rounded-none" />
        </div>
      )}

      <div className="relative flex">
        {showBtns && (
          <Skeleton className="shrink-0 w-8 h-8 rounded-full self-center mr-1" />
        )}

        <div className="flex gap-1.5 overflow-hidden flex-1">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="shrink-0 w-1/2 sm:w-1/3 md:w-1/5">
              {itemSkeleton}
            </div>
          ))}
        </div>

        {showBtns && (
          <Skeleton className="shrink-0 w-8 h-8 rounded-full self-center ml-1" />
        )}
      </div>
    </div>
  );
};