"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GenericSearchForm from "@/components/dashboard/form/generic-search-form/generic-search-form";
import { useUserSearchFilters } from "../../stores/users-store";
import { GetUserQuerySchema, IGetUserQuery } from "../../schemas/user-schemas";

export default function UserSearchFilters() {
  const { setFilters, resetFilters } = useUserSearchFilters();

  const methods = useForm<IGetUserQuery>({
    resolver: zodResolver(GetUserQuerySchema),
  });

  const onSubmit = (data: IGetUserQuery) => {
    setFilters({
      ...data,
    });
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
              name: "search",
              label: "Buscar por nombre o email",
              placeholder: "Ej: usuario123, @gmail, .ar ...",
              className: "sm:col-span-4",
            },
            {
              type: "sorter",
              name: "search",
              className: "sm:col-span-2 w-full",
              options: [
                { value: "createdAt", label: "Creación" },
                { value: "updatedAt", label: "Actualización" },
                { value: "name", label: "Nombre" },
              ],
              defaultValue: "createdAt",
            },
            {
              type: "status",
              name: "status",
              label: "Estados del usuario",
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
              type: "select",
              name: "role",
              label: "Rol",
              options: [
                { value: "false", label: "Todos" },
                { value: "USER", label: "Usuarios" },
                { value: "EDITOR", label: "Editores" },
                { value: "ADMIN", label: "Administradores" },
              ],
              defaultValue: "false",
              placeholder: "Todos",
              className: "sm:col-span-2 sm:row-start-4",
            },
          ]}
        />
      </div>
    </FormProvider>
  );
}
