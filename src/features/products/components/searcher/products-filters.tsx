"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GetProductsQuerySchema,
  IGetProductsQuery,
} from "../../schemas/products-schemas";
import GenericSearchForm from "@/components/dashboard/form/generic-search-form/generic-search-form";
import { useCategories } from "@/features/categories/services/categories-querys";
import { useProductsSearchFilters } from "../../stores/products-search-filters-store";

export default function ProductSearchFilters() {
  const { setFilters, resetFilters } = useProductsSearchFilters();

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: getCategoriesError,
  } = useCategories({ subcategories: true });

  const methods = useForm<IGetProductsQuery>({
    resolver: zodResolver(GetProductsQuerySchema),
  });

  const onSubmit = (data: IGetProductsQuery) => {
    setFilters({
      ...data,
      relevance: data.relevance ? (Number(data.relevance) > 0 ? data.relevance : undefined) : undefined,
    });
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
              name: "search",
              label: "Buscar por nombre, palabra clave o etiqueta",
              placeholder: "Ej: buzzo, algodón, verano...",
              className: "sm:col-span-4",
            },
            {
              type: "sorter",
              name: "search",
              className: "sm:col-span-2 w-full",
              options: [
                { value: "createdAt", label: "Creación" },
                { value: "name", label: "Nombre" },
                { value: "price", label: "Precio" },
                { value: "relevance", label: "Relevancia" },
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
                { value: "ACTIVE", label: "Activos" },
                { value: "ARCHIVED", label: "Archivados" },
                { value: "DELETED", label: "Eliminados" },
              ],
              defaultValue: "false",
            },
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
              options: categories.map((category: any) => {
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
              options: categories.flatMap((cat: any) =>
                cat.subcategories.map((sub: any) => ({
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
