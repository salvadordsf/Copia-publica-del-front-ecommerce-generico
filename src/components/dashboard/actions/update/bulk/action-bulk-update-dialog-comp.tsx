"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import BulkUpdateDialog from "./action-bulk-update-dialog";
import { useState } from "react";
import { ZodSchema } from "zod";
import { GenericFormField } from "@/components/dashboard/form/generic-create-form/generic-create-form.types";
import { useCategories } from "@/features/categories/services/categories-querys";

interface IBulkUpdateDialogProps {
  useResourceBulkFiltersStore: () => { filters: any };
  useUpdateManyResources: () => {
    mutateAsync: ({ filters, data }: { filters: any; data: any }) => void;
    isError: boolean;
    error: unknown;
  };
  totalResources: number;
  resourceType: string;
  resourceGenre: "fem" | "masc";
  updateBulkResourceSchema: ZodSchema;
  defaultUpdateValues: any;
  fields: ("status" | "relevance" | "categoryId")[];
}

export const BulkUpdateDialogComponent = ({
  totalResources,
  resourceType,
  resourceGenre,
  useResourceBulkFiltersStore,
  useUpdateManyResources,
  updateBulkResourceSchema,
  defaultUpdateValues,
  fields,
}: IBulkUpdateDialogProps) => {
  const { filters } = useResourceBulkFiltersStore();
  const {
    mutateAsync: updateManyAction,
    isError,
    error,
  } = useUpdateManyResources();

  const {
    data: { success, data: categories } = {},
    isLoading: isLoadingCategories,
    isError: getCategoriesError,
  } = useCategories({ subcategories: true });

  const [isBulkOpen, setIsBulkOpen] = useState(false);

  const methods = useForm({
    resolver: zodResolver(updateBulkResourceSchema),
    defaultValues: defaultUpdateValues,
  });

  const updateFields = [
    fields.includes("status") && {
      name: "status",
      label:
        resourceGenre === "fem"
          ? `Estado de las ${resourceType}`
          : `Estado de los ${resourceType}`,
      type: "select",
      placeholder: "Seleccionar nuevo estado",
      className: "sm:col-start-0 sm:col-span-2 w-full",
      options: [
        { value: "ACTIVE", label: "Activos" },
        { value: "ARCHIVED", label: "Archivados" },
      ],
    },
    fields.includes("relevance") && {
      name: "relevance",
      label: "Relevancia de los productos [1 - 6]",
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
    fields.includes("categoryId") && {
      name: "categoryId",
      label: "Categoría",
      selectLabel: "Categorías",
      placeholder: "Seleccionar nueva categoría",
      type: "select",
      options: categories.map((category: any) => {
        return { value: category.id, label: category.name };
      }),
      className: "sm:col-span-2 sm:row-start-3",
    },
  ].filter(Boolean) as GenericFormField[];

  return (
    <BulkUpdateDialog
      useFormMethods={methods}
      openState={[isBulkOpen, setIsBulkOpen]}
      fields={updateFields}
      onSubmitAction={(data) => updateManyAction({ filters, data })}
      isError={isError}
      serverError={error}
      totalResources={totalResources}
      resourceType={resourceType}
    />
  );
};
