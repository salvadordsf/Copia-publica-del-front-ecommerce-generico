"use client";

import { statusTranslate } from "@/utils/status-translate";
import { stringToDateToString } from "@/utils/date-to-string-utility";
import { statusRowClassGenerator } from "@/utils/status-row-class-generator";
import UiTable from "@/components/dashboard/table/table";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ConfirmBulkDeleteDialog from "@/components/dashboard/actions/delete/action-bulk-delete-dialog";
import { BulkUpdateDialogComponent } from "@/components/dashboard/actions/update/bulk/action-bulk-update-dialog-comp";
import { useSubcategoriesBulkFilters } from "../../store/categories-bulk-filters";
import {
  useDeleteManySubcategories,
  useUpdateManySubcategories,
} from "../../services/subcategories-mutations";
import { useSubcategories } from "../../services/subcategories-querys";
import { UpdateBulkSubcategoriesSchema } from "../../schemas/subcategories-schema";

export default function SubcategoriesBulkFiltersResults() {
  const { filters } = useSubcategoriesBulkFilters();
  const { mutateAsync: deleteSubcategories } = useDeleteManySubcategories();
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    setShowPreview(false);
  }, [filters]);

  const {
    data: { success, data: subs },
    isLoading: isLoadingSubcategories,
    isError: getSubcategoriesError,
  } = useSubcategories({ category: true });

  const total = subs.length ?? 0;

  const subcategories = subs ?? [];

  console.log(filters);

  if (isLoadingSubcategories) return <div>Loading subcategories...</div>;
  if (getSubcategoriesError)
    return <div>Error al obtener subcategorías filtrados</div>;

  return (
    <>
      <div className="flex flex-col gap-5">
        <p>
          Subcategorías filtrados para modificar: <strong>{total}</strong>
        </p>

        {total > 0 && (
          <div className="flex flex-col sm:flex-row gap-5">
            <BulkUpdateDialogComponent
              resourceType={"subcategorías"}
              resourceGenre={"masc"}
              fields={["status", "relevance"]}
              totalResources={total}
              useResourceBulkFiltersStore={useSubcategoriesBulkFilters}
              useUpdateManyResources={useUpdateManySubcategories}
              updateBulkResourceSchema={UpdateBulkSubcategoriesSchema}
              defaultUpdateValues={{ status: undefined, categoryId: undefined }}
            />

            <ConfirmBulkDeleteDialog
              totalResources={total}
              resourceType="subcategorías"
              resourceGenre="fem"
              onConfirmActions={[() => deleteSubcategories(filters)]}
            />
          </div>
        )}
        {total > 0 && !showPreview && (
          <Button
            onClick={() => setShowPreview(true)}
            className="cursor-pointer sm:w-82"
          >
            Ver previsualización (listar {total} subcategorías)
          </Button>
        )}
      </div>

      {subcategories && <div>Cargando listado completo...</div>}
      {showPreview && subcategories && total > 0 && (
        <UiTable
          className="mt-5"
          caption={`Listado de las ${total} subcategorías seleccionadas con los filtros.`}
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
              subcategories.map((subcategory: any) => {
                return {
                  rowCells: [
                    { type: "body", text: subcategory.name },
                    { type: "body", text: `$${subcategory.category.name}` },
                    { type: "body", text: subcategory._count.products },
                    {
                      type: "body",
                      text: statusTranslate(subcategory.status, "masc"),
                    },
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
                  className: statusRowClassGenerator(subcategory),
                };
              }),
          }}
        />
      )}
    </>
  );
}
