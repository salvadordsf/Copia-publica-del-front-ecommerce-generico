import { IOrder } from "@/types/resources/order-types";
import OrderCard from "./profile-order-card";

export default function OrdersSection({
  title,
  orders,
  canCancel,
}: {
  title: string;
  orders: IOrder[];
  canCancel?: boolean;
}) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold">{title}</h4>

      <div className="space-y-3">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            canCancel={canCancel}
          />
        ))}
      </div>
    </div>
  );
}
