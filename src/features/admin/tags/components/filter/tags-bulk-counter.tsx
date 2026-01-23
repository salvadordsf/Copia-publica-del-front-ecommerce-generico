"use client";

import { useEffect, useState } from "react";
import ConfirmBulkDeleteDialog from "@/components/dashboard/actions/delete/action-bulk-delete-dialog";
import { Button } from "@/components/ui/button";
import UiTable from "@/components/dashboard/table/table";
import { statusTranslate } from "@/utils/status-translate";
import { stringToDateToString } from "@/utils/date-to-string-utility";
import { statusRowClassGenerator } from "@/utils/status-row-class-generator";
import { BulkUpdateDialogComponent } from "@/components/dashboard/actions/update/bulk/action-bulk-update-dialog-comp";
import { useTagsBulkFilters } from "../../stores/tags-bulk-filters";
import {
  useDeleteManyTags,
  useUpdateManyTags,
} from "../../services/tags-mutations";
import { useTags } from "../../services/tags-querys";
import { UpdateBulkTagsSchema } from "../../schemas/tags-schema";

export default function TagsBulkFiltersResults() {
  const { filters } = useTagsBulkFilters();
  const { mutateAsync: deleteTags } = useDeleteManyTags();
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    setShowPreview(false);
  }, [filters]);

  const {
    data: { success, data: tags } = {},
    isLoading: isLoadingTags,
    isError: getTagsError,
  } = useTags(filters);

  const total = tags?.length ?? 0;

  console.log(filters);

  if (isLoadingTags) return <div>Loading Tags...</div>;
  if (getTagsError) return <div>Error al obtener etiquetas filtradas</div>;

  return (
    <>
      <div className="flex flex-col gap-5">
        <p>
          Etiquetas filtradas para modificar: <strong>{total}</strong>
        </p>

        {total > 0 && (
          <div className="flex flex-col sm:flex-row gap-5">
            <BulkUpdateDialogComponent
              resourceType={"etiquetas"}
              resourceGenre={"fem"}
              fields={["status"]}
              totalResources={total}
              useResourceBulkFiltersStore={useTagsBulkFilters}
              useUpdateManyResources={useUpdateManyTags}
              updateBulkResourceSchema={UpdateBulkTagsSchema}
              defaultUpdateValues={{ status: undefined }}
            />

            <ConfirmBulkDeleteDialog
              totalResources={total}
              resourceType="etiquetas"
              resourceGenre="fem"
              onConfirmActions={[() => deleteTags(filters)]}
            />
          </div>
        )}
        {total > 0 && !showPreview && (
          <Button
            onClick={() => setShowPreview(true)}
            className="cursor-pointer sm:w-82"
          >
            Ver previsualización (listar {total} etiquetas)
          </Button>
        )}
      </div>

      {isLoadingTags && <div>Cargando listado completo...</div>}
      {showPreview && tags && total > 0 && (
        <UiTable
          className="mt-5"
          caption={`Listado de las ${total} etiquetas seleccionadas con los filtros.`}
          rows={{
            headerRow: [
              {
                type: "header",
                text: "Nombre",
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
              tags &&
              tags.map((tag: any) => {
                return {
                  rowCells: [
                    { type: "body", text: tag.name },
                    { type: "body", text: tag._count.products },
                    {
                      type: "body",
                      text: statusTranslate(tag.status, "fem"),
                    },
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
                      text:
                        tag.archivedAt && stringToDateToString(tag.archivedAt),
                    },
                    {
                      type: "body",
                      text:
                        tag.deletedAt && stringToDateToString(tag.deletedAt),
                    },
                  ],
                  className: statusRowClassGenerator(tag),
                };
              }),
          }}
        />
      )}
    </>
  );
}
