"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../stores/cart-store";
import { useCreateOrder } from "@/features/admin/orders/services/orders-mutations";
import { useCreateOrderProducts } from "@/features/admin/order-product/services/order-product-mutations";
import ShippingForm from "./shipping-form";
import BuyerForm from "./buyer-form";

export default function CheckoutSteps() {
  const [step, setStep] = useState(1);

  const router = useRouter();
  const items = useCartStore((s) => s.items);

  const [shippingData, setShippingData] = useState<any>(null);
  const [buyerData, setBuyerData] = useState<any>(null);

  const { mutateAsync: createOrder } = useCreateOrder();
  const { mutateAsync: createOrderProducts } = useCreateOrderProducts();

  const handleCreateOrder = async () => {
    if (!shippingData) return;

    const orderRequest = await createOrder(shippingData);
    const order = orderRequest.data;

    const input = items.map((item) => ({
      ...item,
      orderId: order.id,
    }));

    await createOrderProducts(input);

    router.push(`/home/orden?id=${order.id}`);
  };

  return (
    <div className="space-y-6">
      {step === 1 && (
        <ShippingForm
          onNext={(data: any) => {
            setShippingData(data);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <BuyerForm
          onBack={() => setStep(1)}
          onNext={(data: any) => {
            setBuyerData(data);
            handleCreateOrder();
          }}
        />
      )}
    </div>
  );
}
