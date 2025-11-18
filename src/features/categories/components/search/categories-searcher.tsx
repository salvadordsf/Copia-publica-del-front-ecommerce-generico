"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GetCategoryQuerySchema,
  IGetCategoryQuery,
} from "../../schemas/categories-schema";
import CategoryList from "./categories-list";
import GenericSearchForm from "@/components/dashboard/form/generic-search-form/generic-search-form";

export default function CategorySearcher() {
  const [query, setQuery] = useState<IGetCategoryQuery>({
    name: "",
    status: "false",
    subcategories: false,
    products: false,
  });

  const methods = useForm<IGetCategoryQuery>({
    resolver: zodResolver(GetCategoryQuerySchema),
    defaultValues: {
      name: "",
      status: "false",
      subcategories: false,
      products: false,
    },
  });

  const resetFilters = () => methods.reset();

  const onSubmit = (data: IGetCategoryQuery) => {
    setQuery(data);
  };

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
                placeholder: "Ej: ropa, navidad...",
                className: "sm:col-span-3",
              },
              {
                type: "status",
                name: "status",
                label: "Estado de la categoría",
                placeholder: "Todos",
                className:
                  "sm:row-start-1 sm:col-start-4 sm:col-span-2 sm:w-[70%]",
                options: [
                  { value: "false", label: "Todos" },
                  { value: "ACTIVE", label: "Activos" },
                  { value: "ARCHIVED", label: "Archivados" },
                  { value: "DELETED", label: "Eliminados" },
                ],
                defaultValue: "false",
              },
            ]}
            filtersFields={[]}
          />
        </div>
      </FormProvider>

      <CategoryList query={query} />
    </div>
  );
}
