import { Spinner } from "@/components/ui/spinner";
import OrderDetailPage from "@/features/publics/order/order-page";
import { Suspense } from "react";

export default function OrderProductDedicatedPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <OrderDetailPage />;
    </Suspense>
  );
}
