"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import UiPagination from "@/components/dashboard/pagination/pagination";
import UiTable from "@/components/dashboard/table/table";
import { stringToDateToString } from "@/utils/date-to-string-utility";
import { useUserSearchFilters } from "../../stores/users-store";
import { useUsers } from "../../services/users-querys";
import { IUser } from "@/types/resources/user-type";

export default function UserList() {
  const { filters, setFilters } = useUserSearchFilters();

  const router = useRouter();

  const { data, isLoading, isError } = useUsers(filters);
  const usersData = data?.success
    ? data.data
    : { data: [], pagination: { currentPage: 1, totalPages: 1, pageSize: 10 } };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError) return <p>Error al cargar usuarios.</p>;

  if (usersData?.data && !usersData.data.length) {
    return !filters.search ? (
      <p>No se encontraron usuarios.</p>
    ) : (
      <p>
        No se encontraron usuarios al buscar{" "}
        <span className="italic font-semibold">'{filters.search}'</span>.
      </p>
    );
  }

  return (
    <div>
      <UiTable
        caption="Listado de usuarios"
        rows={{
          headerRow: [
            {
              type: "header",
              text: "Nombre",
            },
            {
              type: "header",
              text: "Email",
            },
            {
              type: "header",
              text: "Role",
            },
            {
              type: "header",
              text: "Estado",
            },
            {
              type: "header",
              text: "Creado",
            },
            {
              type: "header",
              text: "Actualizado",
            },
            {
              type: "header",
              text: "Archivado",
            },
            {
              type: "header",
              text: "Eliminado",
            },
          ],
          bodyRows:
            usersData?.data &&
            usersData?.data.map((user: IUser) => {
              return {
                onClickAction: () =>
                  router.push(`/admin/dashboard/users/${user.id}`),
                rowCells: [
                  { type: "body", text: user.name },
                  { type: "body", text: user.email },
                  { type: "body", text: user.role },
                  { type: "body", text: user.status },
                  { type: "body", text: stringToDateToString(user.createdAt) },
                  { type: "body", text: stringToDateToString(user.updatedAt) },
                  {
                    type: "body",
                    text:
                      user.archivedAt && stringToDateToString(user.archivedAt),
                  },
                  {
                    type: "body",
                    text:
                      user.deletedAt && stringToDateToString(user.deletedAt),
                  },
                ],
                className: `${
                  user.status === "ARCHIVED"
                    ? "bg-neutral-200 opacity-70"
                    : user.status === "DELETED" && "bg-red-200"
                } cursor-pointer`,
              };
            }),
        }}
      />

      <UiPagination
        currentPage={usersData.pagination.currentPage}
        totalPages={usersData.pagination.totalPages}
        onPageChangeAction={(pageNum: number) => {
          setFilters({ page: String(pageNum) });
        }}
        pageSize={usersData.pagination.pageSize}
        onPageSizeAction={(pageSize: number) => {
          setFilters({ pageSize: String(pageSize), page: "1" });
        }}
      />
    </div>
  );
}
