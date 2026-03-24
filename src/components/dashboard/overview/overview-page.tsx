"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  ShoppingCart,
  Package,
  TrendingUp,
  Folder,
  Tags,
  FolderTree,
  Layers,
  DollarSign,
  Store,
} from "lucide-react";
import { useUsers } from "@/features/admin/users/services/users-querys";
import { useOrders } from "@/features/admin/orders/services/orders-querys";
import { useProducts } from "@/features/admin/products/services/products-querys";
import { IOrder } from "@/types/resources/order-types";
import { KpiCard } from "./kpi-card";
import { QuickLink } from "./quick-link";

const QUICK_LINKS = [
  { href: "/admin/users", label: "Usuarios", icon: Users },
  { href: "/admin/orders", label: "Órdenes", icon: ShoppingCart },
  { href: "/admin/products", label: "Productos", icon: Package },
  { href: "/admin/categories", label: "Categorías", icon: Folder },
  { href: "/admin/subcategories", label: "Subcategorías", icon: FolderTree },
  { href: "/admin/tags", label: "Tags", icon: Tags },

  {
    href: "/admin/bulk/products",
    label: "Acciones - Productos",
    icon: Layers,
  },
  {
    href: "/admin/bulk/categories",
    label: "Acciones - Categorías",
    icon: Folder,
  },
  {
    href: "/admin/bulk/subcategories",
    label: "Acciones - Subcategorías",
    icon: FolderTree,
  },
  { href: "/admin/bulk/tags", label: "Acciones - Tags", icon: Tags },

  { href: "/admin/sales", label: "Ventas", icon: DollarSign },
  { href: "/admin/store", label: "Gestor de tienda", icon: Store },
];

export default function AdminDashboardOverviewPage() {
  const {
    data: { success: successUsers, data: users } = {},
    isLoading: loadingUsers,
  } = useUsers({ status: "ACTIVE", pageSize: "10" });
  const {
    data: { success: successOrders, data: orders } = {},
    isLoading: loadingOrders,
  } = useOrders({
    status: "PAID",
    pageSize: "1000",
    sortBy: "updatedAt",
    sortOrder: "desc",
  });
  const {
    data: { success: successProducts, data: products } = {},
    isLoading: loadingProducts,
  } = useProducts({ status: "ACTIVE", pageSize: "10" });

  const monthlyEarnings = orders
    ? orders.data.reduce(
        (sum: string, order: IOrder) => Number(sum) + Number(order.totalAmount),
        0,
      )
    : 0;

  return (
    <div className="p-6 pt-2 space-y-6">
      {/* Title */}
      <h1 className="text-2xl font-bold">Vista rápida</h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {loadingUsers || !successUsers ? (
          <KpiCard title="Usuarios" value="0" icon={<Users />} />
        ) : (
          <KpiCard
            title="Usuarios"
            value={users.pagination.totalItems.toString() || "0"}
            icon={<Users />}
          />
        )}

        {loadingOrders || !successOrders ? (
          <KpiCard title="Órdenes pagadas" value="0" icon={<ShoppingCart />} />
        ) : (
          <KpiCard
            title="Órdenes pagadas"
            value={orders.pagination.totalItems.toString() || "0"}
            icon={<ShoppingCart />}
          />
        )}

        {loadingProducts || !successProducts || !products ? (
          <KpiCard title="Productos" value="0" icon={<Package />} />
        ) : (
          <KpiCard
            title="Productos"
            value={products.pagination.totalItems.toString() || "0"}
            icon={<Package />}
          />
        )}

        {loadingOrders || !successOrders ? (
          <KpiCard title="Ganancias del mes" value="0" icon={<TrendingUp />} />
        ) : (
          <KpiCard
            title="Ganancias del mes"
            value={`$${monthlyEarnings}`}
            icon={<TrendingUp />}
          />
        )}
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {QUICK_LINKS.map((item) => {
          const Icon = item.icon;

          return (
            <QuickLink
              key={item.href}
              href={item.href}
              label={item.label}
              icon={<Icon />}
            />
          );
        })}
      </div>

      {/* System Overview */}
      <div>
        <h2 className="text-lg font-semibold mb-3">
          Estado general del e-commerce
        </h2>

        <Card>
          <CardContent className="p-4 space-y-2 text-sm">
            <p>✔ Sistema operativo correctamente</p>
            <p>✔ Base de datos conectada</p>
            <p>✔ API funcionando</p>
            <p>⚡ Última actualización: hoy</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
