"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import BulkUpdateDialog from "./action-bulk-update-dialog";
import { useState } from "react";
import { ZodSchema } from "zod";

interface IBulkUpdateDialogProps {
  useResourceBulkFiltersStore: () => { filters: any };
  useUpdateManyResources: () => {
    mutateAsync: ({ filters, data }: { filters: any; data: any }) => void;
    isError: boolean;
    error: unknown;
  };
  totalResources: number;
  updateBulkResourceSchema: ZodSchema;
  defaultUpdateValues: any;
}

export const BulkUpdateDialogComponent = ({
  totalResources,
  useResourceBulkFiltersStore,
  useUpdateManyResources,
  updateBulkResourceSchema,
  defaultUpdateValues,
}: IBulkUpdateDialogProps) => {
  const { filters } = useResourceBulkFiltersStore();
  const {
    mutateAsync: updateManyAction,
    isError,
    error,
  } = useUpdateManyResources();
  const [isBulkOpen, setIsBulkOpen] = useState(false);

  const methods = useForm({
    resolver: zodResolver(updateBulkResourceSchema),
    defaultValues: defaultUpdateValues,
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
      onSubmitAction={(data) => updateManyAction({ filters, data })}
      isError={isError}
      serverError={error}
      totalResources={totalResources}
      resourceType="productos"
    />
  );
};
