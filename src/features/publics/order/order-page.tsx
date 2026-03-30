"use client";

/**
 * Order detail page (client-side).
 * This page fetches a single order by id, shows its details and
 * handles a temporary frontend-based expiration flow.
 *
 * IMPORTANT:
 * The expiration and auto-cancel logic implemented here
 * is only a temporary solution.
 * In the future, this logic must be handled entirely on the backend when get by id the order.
 */

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrderById } from "@/features/admin/orders/services/orders-querys";
import { ORDER_STATUS_COLOR, ORDER_STATUS_LABEL } from "./order-status-label";
import { useEffect, useRef } from "react";
import { useUpdateOrder } from "@/features/admin/orders/services/orders-mutations";
import { IOrderProduct } from "@/types/resources/order-types";

export default function OrderDetailPage() {
  //get the orderId
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  //get the order by id
  const { data, isPending, isError } = useOrderById(orderId!);
  const order = data?.success ? data.data : null;

  //get the update fn for update order status
  const { mutateAsync: updateOrder } = useUpdateOrder(orderId!);

  //calculate the order total
  const totalToPay =
    order?.products.reduce(
      (acc: number, p: IOrderProduct) => acc + Number(p.subtotal),
      0,
    ) ?? 0;

  /**
   * -----------------------------
   * Expiration calculation
   * -----------------------------
   *
   * The order expires 24 hours after its creation time.
   *
   * ⚠️ TEMPORARY FRONTEND LOGIC
   * This expiration calculation will be moved to the backend
   * in a future version.
   */
  const expiredAt = new Date(
    new Date(order?.createdAt ?? "").getTime() + 24 * 60 * 60 * 1000,
  );
  const isExpired = new Date() > expiredAt;

  //Prevents multiple cancel requests on re-renders
  const alreadyCancelledRef = useRef(false);

  //Auto-cancel expired orders:

  //If the order is expired and still in a payable state, it will be automatically marked as CANCELLED.

  //⚠️ IMPORTANT:
  //This logic should NOT live in the frontend.
  //In the future, expiration and cancellation must be handled by the backend (cron / background job / validation on payment).
  useEffect(() => {
    if (!order) return;

    //avoid executing more than once
    if (alreadyCancelledRef.current) return;

    // Only run if the order is actually expired
    if (!isExpired) return;

    // Do not cancel orders that are already finalized
    if (["CANCELLED", "RADY", "PAID", "SHIPPED"].includes(order.status)) return;

    alreadyCancelledRef.current = true;

    updateOrder({
      status: "CANCELLED",
    }).catch(() => {});
  }, [isExpired, order, updateOrder]);

  if (isPending) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <Card>
          <CardHeader className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </CardHeader>

          <CardContent className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 text-sm text-muted-foreground">
        No se pudo cargar la orden.
      </div>
    );
  }

  if (order.status === "CANCELLED") {
    return (
      <div className="flex flex-col gap-2 max-w-sm m-auto my-20 items-center">
        <div className="text-muted-foreground">
          La orden ya no se encuentra disponible.
        </div>
        <div className="flex gap-1">
          <Button>
            <Link href="/home">Volver al inicio</Link>
          </Button>
          <Button variant="outline">
            <Link href="/home/perfil">Ver tus ordenes</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Card>
        <CardHeader className="flex flex-col gap-4">
          {/* Header top */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-xl font-semibold">
              Orden Nº {order.orderNumber}
            </h1>

            {/* Status badge */}
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium",
                isExpired
                  ? ORDER_STATUS_COLOR["CANCELLED"]
                  : ORDER_STATUS_COLOR[
                      order.status as
                        | "PENDING"
                        | "READY"
                        | "PAID"
                        | "SHIPPED"
                        | "CANCELLED"
                    ],
              )}
            >
              {isExpired
                ? "ORDEN EXPIRADA"
                : ORDER_STATUS_LABEL[
                    order.status as
                      | "PENDING"
                      | "READY"
                      | "PAID"
                      | "SHIPPED"
                      | "CANCELLED"
                  ]}
            </span>
          </div>

          {/* User info */}
          <p className="text-sm text-muted-foreground">
            Usuario: {order.user.email}
          </p>

          {/* Creation date */}
          <p className="text-xs text-muted-foreground">
            Orden creada el{" "}
            {new Date(order.createdAt).toLocaleString("es-AR", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>

          {/* Expiration date */}
          <p className="text-xs font-semibold text-muted-foreground">
            Expira el{" "}
            {new Date(
              new Date(order.createdAt).getTime() + 24 * 60 * 60 * 1000,
            ).toLocaleString("es-AR", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>

          {/* Shipping info */}
          <div className="mt-2 rounded-md border bg-muted/40 p-3">
            <p className="text-sm font-medium">Datos de envío</p>

            <div className="mt-1 text-xs text-muted-foreground space-y-1">
              <p>{order.shippingStreet}</p>

              <p>
                {order.shippingCity}, {order.shippingProvince}
              </p>

              <p>
                CP {order.shippingPostal} — {order.shippingCountry}
              </p>

              {order.shippingNotes && (
                <p className="italic">Nota: {order.shippingNotes}</p>
              )}
            </div>
          </div>
        </CardHeader>

        {/* Message shown when the order is expired */}
        {isExpired && (
          <div className="flex flex-col gap-3 rounded-lg m-2 border border-red-200 bg-red-50 p-4 text-sm text-red-900">
            <p className="font-semibold">Esta orden se encuentra expirada</p>

            <p className="mt-1">
              El plazo para realizar el pago venció. Si querés comprar
              nuevamente estos productos, deberás generar una nueva orden desde
              el carrito.
            </p>

            <div className="flex flex-col gap-3">
              <Button asChild className="w-full">
                <Link href="/home/perfil">Ver mis órdenes</Link>
              </Button>

              <Button asChild variant="outline" className="w-full">
                <Link href="/home">Volver al inicio</Link>
              </Button>
            </div>
          </div>
        )}

        {/* Main content is hidden when the order is expired */}
        {!isExpired && (
          <CardContent className="space-y-6">
            {/* General order info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground">Productos</span>
                <span className="font-medium">{order._count.products}</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground">Estado actual</span>
                {/* Status badge */}
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium",
                    isExpired
                      ? ORDER_STATUS_COLOR["CANCELLED"]
                      : ORDER_STATUS_COLOR[
                          order.status as
                            | "PENDING"
                            | "READY"
                            | "PAID"
                            | "SHIPPED"
                            | "CANCELLED"
                        ],
                  )}
                >
                  {isExpired
                    ? "ORDEN EXPIRADA"
                    : ORDER_STATUS_LABEL[
                        order.status as
                          | "PENDING"
                          | "READY"
                          | "PAID"
                          | "SHIPPED"
                          | "CANCELLED"
                      ]}
                </span>
              </div>
            </div>

            {/* Manual payment block (only when payable) */}
            {(order.status === "PENDING" || order.status === "READY") && (
              <div className="space-y-4 rounded-lg border p-4 text-sm">
                {/* Important reminder */}
                <div className="flex flex-col gap-1 rounded-md border border-yellow-300 bg-yellow-50 p-3 text-yellow-900">
                  <p className="font-semibold">⚠️ IMPORTANTE</p>
                  <p className="mt-1">
                    Las ordenes expiran{" "}
                    <span className="font-semibold">24 horas</span> desde su
                    creación si no se concreta el pago.{" "}
                    <span className="font-semibold">
                      La transferencia de una orden expirada no tendrá validez.
                    </span>
                  </p>
                  <p className="mt-1">
                    Si{" "}
                    <span className="font-semibold">
                      no enviás el comprobante{" "}
                    </span>{" "}
                    de transferencia, el pedido será considerado como{" "}
                    <span className="font-semibold">no pagado</span>.
                  </p>
                  <p className="mt-1">
                    El impacto de la transferencia puede demorar entre 24 y 48
                    horas en verse reflejado.
                  </p>
                </div>

                {/* Payment instructions */}
                <div className="space-y-1">
                  <p className="font-medium">Pago por transferencia</p>

                  <p className="text-muted-foreground">
                    Debés transferir el importe total de tu pedido y enviar el
                    comprobante para que podamos validarlo.
                  </p>
                </div>

                {/* Payment data */}
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Total a transferir
                    </span>
                    <span className="font-semibold">
                      ${totalToPay.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Enviar comprobante por WhatsApp
                    </span>
                    <span className="font-medium">[XXX-XXX-XXXX]</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">O por email</span>
                    <span className="font-medium">[pagos@tutienda.com]</span>
                  </div>
                </div>
              </div>
            )}

            {/* Product list */}
            <div className="flex flex-col">
              <h2 className="mb-2 text-sm font-medium">Productos</h2>

              <div className="divide-y rounded-md border">
                {order.products.map((p: IOrderProduct) => (
                  <div key={p.id} className="flex items-center gap-4 p-4">
                    <div className="flex flex-1 flex-col">
                      <span className="text-sm font-medium">
                        {p.productName}
                      </span>

                      <span className="text-xs text-muted-foreground">
                        Cantidad: {p.quantity}
                      </span>
                    </div>

                    <div className="text-sm font-medium">${p.subtotal}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button asChild className="w-full">
                <Link href="/home/perfil">Ver mis órdenes</Link>
              </Button>

              <Button asChild variant="outline" className="w-full">
                <Link href="/home">Volver al inicio</Link>
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
