"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GetSubcategoryQuerySchema,
  IGetSubcategoryQuery,
} from "../../schemas/subcategories-schema";
import SubcategoryList from "./subcategories-list";
import GenericSearchForm from "@/components/dashboard/form/generic-search-form/generic-search-form";
import { useCategories } from "@/features/admin/categories/services/categories-querys";

export default function SubcategorySearcher() {
  const {
    data: { success, data: categories } = {},
    isLoading: isLoadingCategories,
    isError: getCategoriesError,
  } = useCategories({ subcategories: true });

  const defaultValues: IGetSubcategoryQuery = {
    name: "",
    status: "false",
    categoryId: "",
    category: true,
    products: false,
  };

  const [query, setQuery] = useState<IGetSubcategoryQuery>(defaultValues);

  const methods = useForm<IGetSubcategoryQuery>({
    resolver: zodResolver(GetSubcategoryQuerySchema),
    defaultValues: defaultValues,
  });

  const resetFilters = () => methods.reset();

  const onSubmit = (data: IGetSubcategoryQuery) => {
    setQuery(data);
  };

  if (isLoadingCategories) return <div>Loading categories...</div>;
  if (getCategoriesError) return <div>Error al obtener categorías</div>;

  return (
    <div className="space-y-6">
      <FormProvider {...methods}>
        <div className="space-y-6">
          <GenericSearchForm
            onSubmitAction={onSubmit}
            resetFiltersAction={resetFilters}
            className="sm:grid sm:grid-cols-5 gap-3 pb-4 max-w-2xl"
            defaultFields={[
              {
                type: "search bar",
                name: "name",
                label: "Buscar por nombre",
                placeholder: "Ej: buzzo, algodón, verano...",
                className: "sm:col-span-5",
              },
              {
                type: "status",
                name: "status",
                label: "Estado de la etiqueta",
                placeholder: "Todos",
                className:
                  "sm:row-start-2 sm:col-start-0 sm:col-span-2 sm:w-full",
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

      <SubcategoryList query={query} />
    </div>
  );
}
