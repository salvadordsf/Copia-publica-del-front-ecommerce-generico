import { Spinner } from "@/components/ui/spinner";
import { ProductPage } from "@/features/publics/products/components/product-page";
import { Suspense } from "react";

export default function ProductDedicatedPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <ProductPage />;
    </Suspense>
  );
}
