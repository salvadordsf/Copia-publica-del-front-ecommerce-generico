"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import BulkUpdateDialog from "./action-bulk-update-dialog";
import { useState } from "react";
import { ZodTypeAny } from "zod";
import { GenericFormField } from "@/components/dashboard/form/generic-create-form/generic-create-form.types";
import { useCategories } from "@/features/admin/categories/services/categories-querys";
import { StoreApi, UseBoundStore } from "zustand";
import { ICategory } from "@/types/resources/category-type";

interface IBulkUpdateDialogProps<TFilters, TFormValues extends FieldValues> {
  useResourceBulkFiltersStore: UseBoundStore<StoreApi<{ filters: TFilters }>>;
  useUpdateManyResources: () => {
    mutateAsync: ({
      filters,
      data,
    }: {
      filters: TFilters;
      data: TFormValues;
    }) => void;
    isError: boolean;
    error: unknown;
  };
  totalResources: number;
  resourceType: string;
  resourceGenre: "fem" | "masc";
  updateBulkResourceSchema: ZodTypeAny;
  defaultUpdateValues: DefaultValues<TFormValues>;
  fields: ("status" | "relevance" | "categoryId")[];
}

export function BulkUpdateDialogComponent<
  TFilters,
  TFormValues extends FieldValues,
>({
  totalResources,
  resourceType,
  resourceGenre,
  useResourceBulkFiltersStore,
  useUpdateManyResources,
  updateBulkResourceSchema,
  defaultUpdateValues,
  fields,
}: IBulkUpdateDialogProps<TFilters, TFormValues>) {
  const { filters } = useResourceBulkFiltersStore();
  const {
    mutateAsync: updateManyAction,
    isError,
    error,
  } = useUpdateManyResources();

  const {
    data,
    isLoading: isLoadingCategories,
    isError: getCategoriesError,
  } = useCategories({ subcategories: true });
  const categories = data?.success ? data.data : [];

  const [isBulkOpen, setIsBulkOpen] = useState(false);

  const methods = useForm<TFormValues>({
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
      options: categories.map((category: ICategory) => {
        return { value: category.id, label: category.name };
      }),
      className: "sm:col-span-2 sm:row-start-3",
    },
  ].filter(Boolean) as GenericFormField[];

  return (
    <BulkUpdateDialog<TFormValues>
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
}
