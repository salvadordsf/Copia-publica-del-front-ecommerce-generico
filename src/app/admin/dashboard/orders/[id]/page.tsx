"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import ResourceProperties from "@/components/dashboard/resource-components/resource-properties/resource-properties";
import ResourceActionsHandler from "@/components/dashboard/actions/actions-handler-component";
import { useOrderById } from "@/features/admin/orders/services/orders-querys";
import {
  useDeleteOrder,
  useUpdateOrder,
} from "@/features/admin/orders/services/orders-mutations";
import UpdateOrderDialog from "@/features/admin/orders/components/update/orders-update-dialog";
import { IOrder } from "@/types/resources/order-types";
import OrderNameDate from "@/components/dashboard/resource-components/resource-name-dates.tsx/order-number-dates";

export default function IdOrderPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useOrderById(id as string);
  const order = data?.success ? data.data : null;

  const updateOrder = useUpdateOrder(id as string);
  const deleteOrder = useDeleteOrder();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 pt-8">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-6 w-1/2" />
      </div>
    );
  }

  if (isError || !order)
    return <p className="pt-8">Error al cargar el orden.</p>;

  return (
    <>
      <div className="pt-5 space-y-6">
        <OrderNameDate order={order} />
        <ResourceProperties
          properties={[
            { key: "Número de orden", value: order.orderNumber },
            {
              key: "Usuario",
              value: order.user.name,
              link: `/admin/dashboard/users/${order.user.id}`,
            },
            { key: "Monto total", value: `$${order.totalAmount}` },
            { key: "Estado", value: order.status },
            { key: "Cantidad de productos", value: order._count.products },
            {
              key: "Info. de envío:",
              value: `${order.shippingCountry} > ${order.shippingProvince} > ${order.shippingCity} (${order.shippingPostal}) > ${order.shippingStreet}`,
            },
            { key: "Notas de envío", value: order.shippingNotes || "No tiene" },
          ]}
        />

        {/* Action btns */}
        <ResourceActionsHandler<IOrder>
          resource={order}
          resourceType="orders"
          updateResourceDialog={<UpdateOrderDialog order={order} />}
          updateResourceAction={updateOrder.mutateAsync}
          deleteResourceAction={deleteOrder.mutateAsync}
        />
      </div>
    </>
  );
}
