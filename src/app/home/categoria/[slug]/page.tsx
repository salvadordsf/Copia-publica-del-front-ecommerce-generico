import { Spinner } from "@/components/ui/spinner";
import { CategoryPage } from "@/features/publics/categories/category-page";
import { Suspense } from "react";

export default function CategoryDedicatedPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <CategoryPage />;
    </Suspense>
  );
}
