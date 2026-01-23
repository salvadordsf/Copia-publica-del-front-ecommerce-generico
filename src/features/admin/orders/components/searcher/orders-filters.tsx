"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GenericSearchForm from "@/components/dashboard/form/generic-search-form/generic-search-form";
import { useOrdersSearchFilters } from "../../stores/orders-search-filters-store";
import {
  GetOrdersQuerySchema,
  IGetOrderQuery,
} from "../../schemas/orders-schema";

export default function OrdersSearchFilters() {
  const { filters, setFilters, resetFilters } = useOrdersSearchFilters();

  const methods = useForm<IGetOrderQuery>({
    resolver: zodResolver(GetOrdersQuerySchema),
  });

  const onSubmit = (data: IGetOrderQuery) => {
    // Compare if filters change exept page
    const filtersChanged = Object.entries(data).some(([key, value]) => {
      if (key === "page") return false;
      return filters[key as keyof IGetOrderQuery] !== value;
    });

    //Reset the page to "1" if some filter change exept page change
    setFilters({
      ...data,
      page: filtersChanged ? "1" : filters.page,
    });
  };

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        <GenericSearchForm
          onSubmitAction={onSubmit}
          resetFiltersAction={resetFilters}
          className="sm:grid sm:grid-cols-4 gap-3 pb-4 max-w-2xl"
          defaultFields={[
            {
              type: "search bar",
              name: "search",
              label: "Buscar por número de orden o nombre de usuario",
              placeholder: "Ej: 12345, Juan Perez, usuario 123...",
              className: "sm:col-span-4",
            },
            {
              type: "text",
              name: "userId",
              label: "Buscar por ID de usuario",
              placeholder: "Ej: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
              className: "sm:col-span-4",
            },
            {
              type: "sorter",
              name: "sortBy",
              className: "sm:col-span-2 w-full",
              options: [
                { value: "createdAt", label: "Creación" },
                { value: "user", label: "Nombre de usuario" },
                { value: "totalAmount", label: "Monto total" },
                { value: "updatedAt", label: "Actualización" },
              ],
              defaultValue: "createdAt",
            },
            {
              type: "status",
              name: "status",
              label: "Estado del producto",
              placeholder: "Todos",
              className: "sm:col-start-3 sm:col-span-2 w-full",
              options: [
                { value: "false", label: "Todos" },
                { value: "PENDING", label: "Pendientes" },
                { value: "READY", label: "Listos" },
                { value: "PAID", label: "Pagados" },
                { value: "SHIPPED", label: "Enviados" },
                { value: "CANCELLED", label: "Cancelados" },
              ],
              defaultValue: "false",
            },
          ]}
          filtersFields={[]}
        />
      </div>
    </FormProvider>
  );
}
