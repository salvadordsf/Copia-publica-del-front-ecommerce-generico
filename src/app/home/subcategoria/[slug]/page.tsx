import { Spinner } from "@/components/ui/spinner";
import { SubcategoryPage } from "@/features/publics/subcategories/subcategory-page";
import { Suspense } from "react";

export default function SubcategoryDedicatedPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <SubcategoryPage />;
    </Suspense>
  );
}
