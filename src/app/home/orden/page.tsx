import OrderDetailPageSkeleton from "@/components/skeletons/public/orders/order-detail-page-skeleton";
import OrderDetailPage from "@/features/publics/order/order-page";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Detalle de orden",
  description: "Consulta el detalle de tu orden en nuestro ecommerce genérico.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OrderProductDedicatedPage() {
  return (
    <Suspense fallback={<OrderDetailPageSkeleton />}>
      <OrderDetailPage />;
    </Suspense>
  );
}
