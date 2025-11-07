"use client";

import { UpdateBulkProductsSchema } from "@/features/products/schemas/products-schemas";
import { useUpdateManyProducts } from "@/features/products/services/products-mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import BulkUpdateDialog from "./action-bulk-update-dialog";
import { useState } from "react";
import { useProductsBulkFilters } from "@/features/products/stores/products-bulk-filters";

export const BulkUpdateDialogComponent = ({
  totalResources,
}: {
  totalResources: number;
}) => {
  const { filters } = useProductsBulkFilters();
  const {
    mutateAsync: updateProducts,
    isError,
    error,
  } = useUpdateManyProducts();
  const [isBulkOpen, setIsBulkOpen] = useState(false);

  const methods = useForm({
    resolver: zodResolver(UpdateBulkProductsSchema),
    defaultValues: { status: undefined, relevance: undefined },
  });

  return (
    <BulkUpdateDialog
      useFormMethods={methods}
      openState={[isBulkOpen, setIsBulkOpen]}
      fields={[
        {
          name: "status",
          label: "Estado del producto",
          type: "select",
          placeholder: "Seleccionar nuevo estado",
          className: "sm:col-start-0 sm:col-span-2 w-full",
          options: [
            { value: "ACTIVE", label: "Activos" },
            { value: "ARCHIVED", label: "Archivados" },
          ],
        },
        {
          name: "relevance",
          label: "Relevancia del producto [1 - 6]",
          type: "slider",
          min: 1,
          max: 6,
          step: 1,
          ux: {
            uxMinMax: false,
            uxSteps: true,
          },
          className: "col-start-2 row-start-6",
        },
      ]}
      onSubmitAction={(data) => updateProducts({ filters, data })}
      isError={isError}
      serverError={error}
      totalResources={totalResources}
      resourceType="productos"
    />
  );
};
