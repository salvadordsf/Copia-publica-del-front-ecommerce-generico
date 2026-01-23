"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { IGetCategoryQuery } from "../../schemas/categories-schema";
import { useCategories } from "../../services/categories-querys";
import UiTable from "@/components/dashboard/table/table";
import { statusTranslate } from "@/utils/status-translate";
import { stringToDateToString } from "@/utils/date-to-string-utility";
import { statusRowClassGenerator } from "@/utils/status-row-class-generator";

interface Props {
  query: IGetCategoryQuery;
}

export default function CategoryList({ query }: Props) {
  const router = useRouter();

  const {
    data: { success, data: categories } = {},
    isLoading,
    isError,
  } = useCategories({
    name: query.name,
    status: query.status && query.status !== "false" ? query.status : undefined,
    subcategories: query.subcategories ? query.subcategories : undefined,
    products: query.products ? query.products : undefined,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError) return <p>Error al cargar categorías.</p>;
  if (!categories?.length) {
    return !query.name ? (
      <p>No se encontraron categorías.</p>
    ) : (
      <p>
        No se encontraron categorías al buscar{" "}
        <span className="italic font-semibold">"{query.name}"</span>.
      </p>
    );
  }

  return (
    <UiTable
      caption="Listado de categorías"
      rows={{
        headerRow: [
          {
            type: "header",
            text: "Nombre",
          },
          {
            type: "header",
            text: "Subcategorías",
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
          categories &&
          categories.map((category: any) => {
            return {
              onClickAction: () =>
                router.push(`/admin/dashboard/categories/${category.id}`),
              rowCells: [
                { type: "body", text: category.name },
                { type: "body", text: category._count.subcategories },
                { type: "body", text: category._count.products },
                { type: "body", text: statusTranslate(category.status, "fem") },
                {
                  type: "body",
                  text: stringToDateToString(category.createdAt),
                },
                {
                  type: "body",
                  text: stringToDateToString(category.updatedAt),
                },
                {
                  type: "body",
                  text:
                    category.archivedAt &&
                    stringToDateToString(category.archivedAt),
                },
                {
                  type: "body",
                  text:
                    category.deletedAt &&
                    stringToDateToString(category.deletedAt),
                },
              ],
              className: statusRowClassGenerator(category),
            };
          }),
      }}
    />
  );
}
