import ResourceDatesRegisters from "../resource-dates-register/resource-dates-register";
import { IOrder } from "@/types/resources/order-types";

export default function OrderNameDate({ order }: { order: IOrder }) {
  return (
    <>
      <h1 className="text-2xl font-bold capitalize mb-0">
        {order.orderNumber}
      </h1>
      <ResourceDatesRegisters resource={order} />
    </>
  );
}
