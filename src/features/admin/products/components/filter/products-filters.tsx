"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FilterBulkProductsQuerySchema,
  IFilterBulkProductsQuery,
} from "../../schemas/products-schemas";
import GenericSearchForm from "@/components/dashboard/form/generic-search-form/generic-search-form";
import { useCategories } from "@/features/admin/categories/services/categories-querys";
import { useProductsBulkFilters } from "../../stores/products-bulk-filters";
import { ICategory } from "@/types/resources/category-type";
import { ISubcategory } from "@/types/resources/subcategory-type";

export default function ProductBulkFilters({
  statusFilter = true,
}: {
  statusFilter?: boolean;
}) {
  const { setFilters, resetFilters } = useProductsBulkFilters();

  const {
    data,
    isLoading: isLoadingCategories,
    isError: getCategoriesError,
  } = useCategories({ subcategories: true });
  const categories = data?.success ? data.data : [];

  const methods = useForm<IFilterBulkProductsQuery>({
    resolver: zodResolver(FilterBulkProductsQuerySchema),
  });

  const onSubmit = (data: IFilterBulkProductsQuery) => {
    const filters = {
      ...data,
      relevance:
        data.relevance && Number(data.relevance) > 0
          ? data.relevance
          : undefined,
    };

    setFilters(filters);
  };

  if (isLoadingCategories) return <div>Loading categories...</div>;
  if (getCategoriesError) return <div>Error al obtener categorías</div>;

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
              name: "name",
              label: "Buscar por nombre",
              placeholder: "Ej: buzzo, algodón, verano...",
              className: "sm:col-span-4",
            },
            ...(statusFilter
              ? [
                  {
                    type: "status" as const,
                    name: "status",
                    label: "Estado del producto",
                    placeholder: "Todos",
                    className: "sm:col-start-0 sm:col-span-2 w-full",
                    options: [
                      { value: "false", label: "Todos" },
                      { value: "ACTIVE", label: "Activos" },
                      { value: "ARCHIVED", label: "Archivados" },
                      { value: "DELETED", label: "Eliminados" },
                    ],
                    defaultValue: "false",
                  },
                ]
              : []),
          ]}
          filtersFields={[
            {
              type: "price",
              name: "price",
              label: "Rango de precios",
              className: "sm:col-span-2 sm:row-start-3",
            },
            {
              type: "select",
              name: "relevance",
              label: "Nivel de relevancia",
              options: Array.from({ length: 7 }, (_, i) => {
                if (i <= 0) {
                  return { value: "0", label: "Todos" };
                }
                const val = i.toString();
                return { value: val, label: val };
              }),
              placeholder: "1 - 6",
              className: "sm:col-span-2 sm:row-start-4",
            },
            {
              name: "categoryId",
              label: "Categoría",
              selectLabel: "Categorías",
              placeholder: "Seleccionar categoría",
              type: "select",
              options: categories.map((category: ICategory) => {
                return { value: category.id, label: category.name };
              }),
              className: "sm:col-span-2 sm:row-start-3",
            },
            {
              name: "subcategoryId",
              label: "Subcategoría",
              selectLabel: "Subcategorías",
              placeholder: "Seleccionar subcategoría",
              type: "select",
              dependsOn: "categoryId",
              options: categories.flatMap((cat: ICategory) =>
                cat.subcategories.map((sub: ISubcategory) => ({
                  value: sub.id,
                  label: sub.name,
                  categoryId: cat.id,
                }))
              ),
              className: "sm:col-span-2 sm:row-start-4",
            },
          ]}
        />
      </div>
    </FormProvider>
  );
}
