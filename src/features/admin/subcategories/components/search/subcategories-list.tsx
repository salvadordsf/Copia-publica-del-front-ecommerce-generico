"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { IGetSubcategoryQuery } from "../../schemas/subcategories-schema";
import { useSubcategories } from "../../services/subcategories-querys";
import UiTable from "@/components/dashboard/table/table";
import { stringToDateToString } from "@/utils/date-to-string-utility";
import { statusTranslate } from "@/utils/status-translate";
import { statusRowClassGenerator } from "@/utils/status-row-class-generator";
import { ISubcategory } from "@/types/resources/subcategory-type";

interface Props {
  query: IGetSubcategoryQuery;
}

export default function SubcategoryList({ query }: Props) {
  const router = useRouter();

  const {
    data,
    isLoading,
    isError,
  } = useSubcategories({
    name: query.name,
    status: query.status && query.status !== "false" ? query.status : undefined,
    categoryId: query.categoryId ? query.categoryId : undefined,
    category: query.category ? query.category : undefined,
    products: query.products ? query.products : undefined,
  });
  const subcategories = data?.success ? data.data : [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError) return <p>Error al cargar subcategorías.</p>;
  if (!subcategories?.length) {
    return !query.name ? (
      <p>No se encontraron subcategorías.</p>
    ) : (
      <p>
        No se encontraron subcategorías al buscar{" "}
        <span className="italic font-semibold">"{query.name}"</span>.
      </p>
    );
  }

  return (
    <UiTable
      caption="Listado de subcategorías"
      rows={{
        headerRow: [
          {
            type: "header",
            text: "Nombre",
          },
          {
            type: "header",
            text: "Categoría",
          },
          {
            type: "header",
            text: "Productos",
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
          subcategories &&
          subcategories.map((subcategory: ISubcategory) => {
            return {
              onClickAction: () =>
                router.push(`/admin/dashboard/subcategories/${subcategory.id}`),
              rowCells: [
                { type: "body", text: subcategory.name },
                { type: "body", text: subcategory.category.name },
                { type: "body", text: subcategory._count.products },
                { type: "body", text: statusTranslate(subcategory.status, "fem") },
                {
                  type: "body",
                  text: stringToDateToString(subcategory.createdAt),
                },
                {
                  type: "body",
                  text: stringToDateToString(subcategory.updatedAt),
                },
                {
                  type: "body",
                  text:
                    subcategory.archivedAt &&
                    stringToDateToString(subcategory.archivedAt),
                },
                {
                  type: "body",
                  text:
                    subcategory.deletedAt &&
                    stringToDateToString(subcategory.deletedAt),
                },
              ],
              className: statusRowClassGenerator(subcategory)
            };
          }),
      }}
    />
  );
}
