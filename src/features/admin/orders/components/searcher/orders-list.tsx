"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import UiPagination from "@/components/dashboard/pagination/pagination";
import UiTable from "@/components/dashboard/table/table";
import { stringToDateToString } from "@/utils/date-to-string-utility";
import { orderStatusRowClassGenerator } from "@/utils/status-row-class-generator";
import { ORDER_STATUS_LABEL } from "@/utils/status-translate";
import { useOrdersSearchFilters } from "../../stores/orders-search-filters-store";
import { useOrders } from "../../services/orders-querys";
import { IOrder } from "@/types/resources/order-types";

export default function OrderList() {
  const { filters, setFilters } = useOrdersSearchFilters();

  const router = useRouter();

  const { data, isLoading, isError } = useOrders(filters);
  const orders = data?.success
    ? data.data
    : { data: [], pagination: { currentPage: 1, totalPages: 1, pageSize: 10 } };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError) return <p>Error al cargar ordenes.</p>;

  if (orders?.data && !orders.data.length) {
    return !filters.search ? (
      <p>No se encontraron ordenes.</p>
    ) : (
      <p>
        No se encontraron ordenes al buscar{" "}
        <span className="italic font-semibold">"{filters.search}"</span>.
      </p>
    );
  }

  return (
    <div>
      <UiTable
        caption="Listado de ordenes"
        rows={{
          headerRow: [
            {
              type: "header",
              text: "Número de orden",
            },
            {
              type: "header",
              text: "Nombre de usuario",
            },
            {
              type: "header",
              text: "Estado",
            },
            {
              type: "header",
              text: "Monto total",
            },
            {
              type: "header",
              text: "Productos",
            },
            {
              type: "header",
              text: "Creado",
            },
            {
              type: "header",
              text: "Actualizado",
            },
          ],
          bodyRows:
            orders.data &&
            orders.data.map((order: IOrder) => {
              return {
                onClickAction: () =>
                  router.push(`/admin/dashboard/orders/${order.id}`),
                rowCells: [
                  { type: "body", text: order.orderNumber },
                  { type: "body", text: order.user.name },
                  { type: "body", text: ORDER_STATUS_LABEL[order.status] },
                  { type: "body", text: `$${order.totalAmount}` },
                  { type: "body", text: order._count.products },
                  { type: "body", text: stringToDateToString(order.createdAt) },
                  { type: "body", text: stringToDateToString(order.updatedAt) },
                ],
                className: orderStatusRowClassGenerator(order),
              };
            }),
        }}
      />

      <UiPagination
        currentPage={orders.pagination.currentPage}
        totalPages={orders.pagination.totalPages}
        onPageChangeAction={(pageNum: number) => {
          setFilters({ page: String(pageNum) });
        }}
        pageSize={orders.pagination.pageSize}
        onPageSizeAction={(pageSize: number) => {
          setFilters({ pageSize: String(pageSize), page: "1" });
        }}
      />
    </div>
  );
}
