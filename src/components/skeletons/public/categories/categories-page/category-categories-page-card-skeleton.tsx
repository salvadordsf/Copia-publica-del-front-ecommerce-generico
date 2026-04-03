"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const CategoryPageCardSkeleton = () => {
  return (
    <div
      className="
        flex flex-col gap-3 rounded-2xl border border-neutral-100 bg-white p-5
        shadow-sm
      "
    >
      {/* Indicador superior */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-1.5 w-6 rounded-full" />
        <Skeleton className="h-4 w-4 rounded" />
      </div>

      {/* Nombre */}
      <div>
        <Skeleton className="h-4 w-[70%]" />
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-1 mt-auto">
        <Skeleton className="h-3 w-[40%]" />
        <Skeleton className="h-3 w-[30%]" />
      </div>
    </div>
  );
};