"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GetTagQuerySchema, IGetTagQuery } from "../../schemas/tags-schema";
import { Search } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TagList from "./tags-list";
import GenericSearchForm from "@/components/dashboard/form/generic-search-form/generic-search-form";

export default function TagSearcher() {
  const defaultFilters: IGetTagQuery = {
    name: "",
    products: false,
    status: "false",
  };

  const [query, setQuery] = useState<IGetTagQuery>(defaultFilters);

  const methods = useForm<IGetTagQuery>({
    resolver: zodResolver(GetTagQuerySchema),
    defaultValues: defaultFilters,
  });

  const resetFilters = () => methods.reset();

  const onSubmit = (data: IGetTagQuery) => {
    console.log(data)
    setQuery(data);
    console.log(query)
  };

  return (
    <div className="space-y-6">
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
                className: "sm:row-start-2 sm:col-start-3 sm:col-span-2 w-full",
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

      <TagList query={query} />
    </div>
  );
}
