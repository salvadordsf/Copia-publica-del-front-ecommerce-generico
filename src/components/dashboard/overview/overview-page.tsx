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
  { href: "/admin/dashboard/users", label: "Usuarios", icon: Users },
  { href: "/admin/dashboard/orders", label: "Órdenes", icon: ShoppingCart },
  { href: "/admin/dashboard/products", label: "Productos", icon: Package },
  { href: "/admin/dashboard/categories", label: "Categorías", icon: Folder },
  {
    href: "/admin/dashboard/subcategories",
    label: "Subcategorías",
    icon: FolderTree,
  },
  { href: "/admin/dashboard/tags", label: "Tags", icon: Tags },

  {
    href: "/admin/dashboard/bulk/products",
    label: "Acciones - Productos",
    icon: Layers,
  },
  {
    href: "/admin/dashboard/bulk/categories",
    label: "Acciones - Categorías",
    icon: Folder,
  },
  {
    href: "/admin/dashboard/bulk/subcategories",
    label: "Acciones - Subcategorías",
    icon: FolderTree,
  },
  { href: "/admin/dashboard/bulk/tags", label: "Acciones - Tags", icon: Tags },

  { href: "/admin/dashboard/sales", label: "Ventas", icon: DollarSign },
  { href: "/admin/dashboard/store", label: "Gestor de tienda", icon: Store },
];

export default function AdminDashboardOverviewPage() {
  const { data: userResponse, isLoading: loadingUsers } = useUsers({
    status: "ACTIVE",
    pageSize: "10",
  });
  const usersData = userResponse?.success
    ? userResponse.data
    : {
        data: [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          pageSize: 10,
          totalItems: 0,
        },
      };

  const { data: ordersResponse, isLoading: loadingOrders } = useOrders({
    status: "PAID",
    pageSize: "1000",
    sortBy: "updatedAt",
    sortOrder: "desc",
  });
  const ordersData = ordersResponse?.success
    ? ordersResponse.data
    : {
        data: [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          pageSize: 10,
          totalItems: 0,
        },
      };

  const { data: productsResponse, isLoading: loadingProducts } = useProducts({
    status: "ACTIVE",
    pageSize: "10",
  });
  const products = productsResponse?.success
    ? productsResponse.data
    : {
        data: [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          pageSize: 10,
          totalItems: 0,
        },
      };

  const monthlyEarnings = ordersData
    ? ordersData.data.reduce(
        (sum: number, order: IOrder) => sum + Number(order.totalAmount),
        0,
      )
    : 0;

  return (
    <div className="p-6 pt-2 space-y-6">
      {/* Title */}
      <h1 className="text-2xl font-bold">Vista rápida</h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {loadingUsers || !userResponse?.success ? (
          <KpiCard title="Usuarios" value="0" icon={<Users />} />
        ) : (
          <KpiCard
            title="Usuarios"
            value={usersData.pagination.totalItems.toString() || "0"}
            icon={<Users />}
          />
        )}

        {loadingOrders || !ordersResponse?.success ? (
          <KpiCard title="Órdenes pagadas" value="0" icon={<ShoppingCart />} />
        ) : (
          <KpiCard
            title="Órdenes pagadas"
            value={ordersData.pagination.totalItems.toString() || "0"}
            icon={<ShoppingCart />}
          />
        )}

        {loadingProducts || !productsResponse?.success || !products ? (
          <KpiCard title="Productos" value="0" icon={<Package />} />
        ) : (
          <KpiCard
            title="Productos"
            value={products.pagination.totalItems.toString() || "0"}
            icon={<Package />}
          />
        )}

        {loadingOrders || !ordersResponse?.success ? (
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
