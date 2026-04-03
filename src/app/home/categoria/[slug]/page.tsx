import { CategoryPageSkeleton } from "@/components/skeletons/public/categories/category-page-skeleton";
import { CategoryPage } from "@/features/publics/categories/category-page";
import { Suspense } from "react";

export default function CategoryDedicatedPage() {
  return (
    <Suspense fallback={<CategoryPageSkeleton />}>
      <CategoryPage />;
    </Suspense>
  );
}
