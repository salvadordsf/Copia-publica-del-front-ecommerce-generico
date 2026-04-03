import { Skeleton } from "@/components/ui/skeleton";

export function CartItemSkeleton() {
  return (
    <div className="rounded-xl border bg-background p-4 shadow-sm">
      <div className="flex gap-4">
        {/* Image */}
        <Skeleton className="h-20 w-20 shrink-0 rounded-lg" />

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between gap-2">
          {/* Name + delete btn */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1.5 flex-1">
              <Skeleton className="h-4 w-3/4 rounded-md" />
              <Skeleton className="h-4 w-1/2 rounded-md" />
            </div>
            <Skeleton className="h-8 w-8 shrink-0 rounded-md" />
          </div>

          {/* Quantity controls + price */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center justify-between gap-4 sm:justify-start">
              <Skeleton className="h-9 w-28 rounded-lg" />
              <Skeleton className="h-3.5 w-16 rounded-md" />
            </div>

            <div className="flex items-end justify-between sm:flex-col sm:items-end sm:justify-center gap-1">
              <Skeleton className="h-3.5 w-20 rounded-md" />
              <Skeleton className="h-5 w-24 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}