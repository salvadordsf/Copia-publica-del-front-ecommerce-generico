"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useTags } from "../../services/tags-querys";
import { IGetTagQuery } from "../../schemas/tags-schema";
import { useRouter } from "next/navigation";
import { statusTranslate } from "@/utils/status-translate";
import { stringToDateToString } from "@/utils/date-to-string-utility";
import { statusRowClassGenerator } from "@/utils/status-row-class-generator";
import UiTable from "@/components/dashboard/table/table";
import { ITag } from "@/types/resources/tag-type";

interface Props {
  query: IGetTagQuery;
}

export default function TagList({ query }: Props) {
  const router = useRouter();

  const {
    data,
    isLoading,
    isError,
  } = useTags({
    name: query.name ? query.name : undefined,
    products: query.products ? query.products : undefined,
    status: query.status && query.status !== "false" ? query.status : undefined,
  });
  const tags = data?.success ? data.data : [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError) return <p>Error al cargar tags.</p>;
  if (!tags?.length) {
    return !query.name ? (
      <p>No se encontraron tags.</p>
    ) : (
      <p>
        No se encontraron tags al buscar{" "}
        <span className="italic font-semibold">"{query.name}"</span>.
      </p>
    );
  }
  return (
    <UiTable
      caption="Listado de etiquetas"
      rows={{
        headerRow: [
          {
            type: "header",
            text: "Nombre",
          },
          {
            type: "header",
            text: "Cantidad de productos",
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
          tags &&
          tags.map((tag: ITag) => {
            return {
              onClickAction: () =>
                router.push(`/admin/dashboard/tags/${tag.id}`),
              rowCells: [
                { type: "body", text: tag.name },
                { type: "body", text: tag._count.products },
                { type: "body", text: statusTranslate(tag.status, "fem") },
                {
                  type: "body",
                  text: stringToDateToString(tag.createdAt),
                },
                {
                  type: "body",
                  text: stringToDateToString(tag.updatedAt),
                },
                {
                  type: "body",
                  text: tag.archivedAt && stringToDateToString(tag.archivedAt),
                },
                {
                  type: "body",
                  text: tag.deletedAt && stringToDateToString(tag.deletedAt),
                },
              ],
              className: statusRowClassGenerator(tag),
            };
          }),
      }}
    />
  );
}
