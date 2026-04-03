"use client";

import { CategoryPageCardSkeleton } from "./category-categories-page-card-skeleton";

export const CategoryPageGridSkeleton = ({ count }: { count: number }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CategoryPageCardSkeleton key={`category-card-skeleton-${i}`}/>
      ))}
    </div>
  );
};
