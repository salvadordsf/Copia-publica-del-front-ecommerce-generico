"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GenericSearchForm from "@/components/dashboard/form/generic-search-form/generic-search-form";
import { useCategories } from "@/features/admin/categories/services/categories-querys";
import {
  FilterBulkSubcategoriesQuerySchema,
  IFilterBulkSubcategoriesQuery,
} from "../../schemas/subcategories-schema";
import { useSubcategoriesBulkFilters } from "../../store/subcategories-bulk-filters";

export default function SubcategoryBulkFilters() {
  const { setFilters, resetFilters } = useSubcategoriesBulkFilters();

  const {
    data: { success, data: categories = [] } = {},
    isLoading: isLoadingCategories,
    isError: getCategoriesError,
  } = useCategories({ subcategories: true });

  const methods = useForm<IFilterBulkSubcategoriesQuery>({
    resolver: zodResolver(FilterBulkSubcategoriesQuerySchema),
  });

  const onSubmit = (data: IFilterBulkSubcategoriesQuery) => {
    setFilters(data);
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
            {
              type: "status",
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
          ]}
          filtersFields={[
            {
              name: "categoryId",
              label: "Categoría",
              selectLabel: "Categorías",
              placeholder: "Seleccionar categoría",
              type: "select",
              options: categories.map((category: any) => {
                return { value: category.id, label: category.name };
              }),
              className: "sm:col-span-2 sm:row-start-3",
            },
          ]}
        />
      </div>
    </FormProvider>
  );
}
