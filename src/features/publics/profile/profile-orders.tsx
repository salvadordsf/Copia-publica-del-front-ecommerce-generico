"use client";

import { IOrder } from "@/types/resources/order-types";
import OrdersSection from "./profile-order-section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  orders: IOrder[];
}

const PENDING_STATUSES = ["PENDING", "READY"];
const COMPLETED_STATUSES = ["PAID", "SHIPPED"];

export default function ProfileOrders({ orders }: Props) {
  const activeOrders = orders.filter((order) => order.status !== "CANCELLED");

  const pendingOrders = activeOrders.filter((order) =>
    PENDING_STATUSES.includes(order.status),
  );

  const completedOrders = activeOrders.filter((order) =>
    COMPLETED_STATUSES.includes(order.status),
  );

  if (activeOrders.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No tenés órdenes activas.{" "}
        <Link
          href="/home"
          className="inline-flex items-center gap-1 underline"
        >
          Ir a comprar
          <ArrowRight className="w-4 h-4" />
        </Link>
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {pendingOrders.length > 0 && (
        <OrdersSection
          title="Órdenes pendientes de finalizar"
          orders={pendingOrders}
          canCancel
        />
      )}

      {completedOrders.length > 0 && (
        <OrdersSection
          title="Órdenes pagadas / concretadas"
          orders={completedOrders}
        />
      )}
    </div>
  );
}