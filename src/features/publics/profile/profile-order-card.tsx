import { Card, CardContent } from "@/components/ui/card";
import { IOrder } from "@/types/resources/order-types";
import { useState } from "react";
import {
  ORDER_STATUS_COLOR,
  ORDER_STATUS_LABEL,
} from "../order/order-status-label";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import OrderProductsList from "./profile-order-products-list";
import { useUpdateOrder } from "@/features/admin/orders/services/orders-mutations";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export default function OrderCard({
  order,
  canCancel,
}: {
  order: IOrder;
  canCancel?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [render, setRender] = useState(true);
  const router = useRouter();
  const { mutate, isPending } = useUpdateOrder(order.id);

  const handleCancel = async () => {
    mutate(
      { status: "CANCELLED" },
      {
        onSuccess: () => {
          toast.success(`Orden #${order.orderNumber} cancelada`);
          setRender(false);
        },
        onError: () =>
          toast.error(`Error al cancelar la orden #${order.orderNumber}`),
      },
    );
  };

  if (render) return (
    <Card>
      <CardContent className="space-y-4 pt-6 text-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="font-medium">Orden #{order.orderNumber}</p>

            <p className="text-xs text-muted-foreground">
              {new Date(order.createdAt).toLocaleString("es-AR", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>

          {/* Status badge */}
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium",
              ORDER_STATUS_COLOR[
                order.status as
                  | "PENDING"
                  | "READY"
                  | "PAID"
                  | "SHIPPED"
                  | "CANCELLED"
              ],
            )}
          >
            {
              ORDER_STATUS_LABEL[
                order.status as
                  | "PENDING"
                  | "READY"
                  | "PAID"
                  | "SHIPPED"
                  | "CANCELLED"
              ]
            }
          </span>
        </div>

        {/* Addres */}
        <div className="space-y-1">
          <p className="text-muted-foreground">Envío</p>

          <p>
            {order.shippingStreet}, {order.shippingCity},{" "}
            {order.shippingProvince}, {order.shippingPostal},{" "}
            {order.shippingCountry}
          </p>

          {order.shippingNotes && (
            <p className="text-xs text-muted-foreground">
              Nota: {order.shippingNotes}
            </p>
          )}
        </div>

        {/* products */}
        <div className="space-y-2">
          <Button
            variant="ghost"
            className="h-7 px-0 text-xs"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <>
                Ocultar productos
                <ChevronUp className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                Ver productos
                <ChevronDown className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>

          {open && <OrderProductsList order={order} />}
        </div>

        <div className="flex items-center justify-between border-t pt-3">
          <span className="font-medium">Total</span>

          <span className="font-semibold">${order.totalAmount}</span>
        </div>

        {canCancel && (
          <div className="flex justify-end gap-1">
            <Button variant="default" size="sm" onClick={()=>router.push(`/home/orden?id=${order.id}`)}>
              Finalizar compra
            </Button>
            <Button variant="destructive" size="sm" onClick={handleCancel} disabled={isPending}>
              {isPending ? <Spinner /> : "Cancelar orden"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
