"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GenericSearchForm from "@/components/dashboard/form/generic-search-form/generic-search-form";
import { useTagsBulkFilters } from "../../stores/tags-bulk-filters";
import {
  FilterBulkTagsQuerySchema,
  IFilterBulkTagsQuery,
} from "../../schemas/tags-schema";

export default function TagsBulkFilters() {
  const { setFilters, resetFilters } = useTagsBulkFilters();

  const methods = useForm<IFilterBulkTagsQuery>({
    resolver: zodResolver(FilterBulkTagsQuerySchema),
  });

  const onSubmit = (data: IFilterBulkTagsQuery) => {
    setFilters(data);
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
              name: "name",
              label: "Buscar por nombre",
              placeholder: "Ej: buzzo, algodón, verano...",
              className: "sm:col-span-4",
            },
            {
              type: "status",
              name: "status",
              label: "Estado de las etiquetas",
              placeholder: "Todos",
              className: "sm:col-start-0 sm:col-span-2 w-full",
              options: [
                { value: "false", label: "Todas" },
                { value: "ACTIVE", label: "Activas" },
                { value: "ARCHIVED", label: "Archivadas" },
                { value: "DELETED", label: "Eliminadas" },
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
