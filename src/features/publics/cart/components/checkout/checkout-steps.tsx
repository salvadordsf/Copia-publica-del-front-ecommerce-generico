"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../stores/cart-store";
import { useCreateOrder } from "@/features/admin/orders/services/orders-mutations";
import { useCreateOrderProducts } from "@/features/admin/order-product/services/order-product-mutations";
import ShippingForm from "./shipping-form";
import BuyerForm from "./buyer-form";
import { IOrderShippingData } from "@/types/resources/order-types";
import { IBuyer } from "./schemas/buyer-schema";
import { IShippingForm } from "./schemas/shipping-info-schema";

export default function CheckoutSteps() {
  const [step, setStep] = useState(1);

  const router = useRouter();
  const items = useCartStore((s) => s.items);

  const [shippingData, setShippingData] = useState<IOrderShippingData>({
    shippingStreet: "",
    shippingCity: "",
    shippingProvince: "",
    shippingPostal: "",
    shippingCountry: "Argentina",
    shippingNotes: "",
  });
  const [_buyerData, setBuyerData] = useState<IBuyer>({
    dni: "",
    email: "",
    name: "",
    phone: "",
  });

  const { mutateAsync: createOrder } = useCreateOrder();
  const { mutateAsync: createOrderProducts } = useCreateOrderProducts();

  const handleCreateOrder = async () => {
    if (!shippingData) return;

    const orderRequest = await createOrder(shippingData);
    const order = orderRequest.success ? orderRequest.data : null;

    if (order && order.id) {
      const input = items.map((item) => ({
        ...item,
        orderId: order?.id,
      }));

      await createOrderProducts(input);
    }

    router.push(`/home/orden?id=${order?.id}`);
  };

  return (
    <div className="space-y-6">
      {step === 1 && (
        <ShippingForm
          onNextAction={(data: IShippingForm) => {
            setShippingData({
              shippingStreet: data.shippingStreet,
              shippingCity: data.shippingCity,
              shippingProvince: data.shippingProvince,
              shippingPostal: data.shippingPostal,
              shippingCountry: data.shippingCountry,
              shippingNotes: data.shippingNotes ?? "",
            });
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <BuyerForm
          onBackAction={() => setStep(1)}
          onNextAction={(data: IBuyer) => {
            setBuyerData(data);
            handleCreateOrder();
          }}
        />
      )}
    </div>
  );
}
