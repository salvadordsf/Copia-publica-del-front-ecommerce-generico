"use client";

import { useEffect, useState } from "react";
import { useCategoriesBulkFilters } from "../../stores/categories-bulk-filters";
import {
  useDeleteManyCategories,
  useUpdateManyCategories,
} from "../../services/categories-mutations";
import { useCategories } from "../../services/categories-querys";
import ConfirmBulkDeleteDialog from "@/components/dashboard/actions/delete/action-bulk-delete-dialog";
import { Button } from "@/components/ui/button";
import UiTable from "@/components/dashboard/table/table";
import { statusTranslate } from "@/utils/status-translate";
import { stringToDateToString } from "@/utils/date-to-string-utility";
import { statusRowClassGenerator } from "@/utils/status-row-class-generator";
import { BulkUpdateDialogComponent } from "@/components/dashboard/actions/update/bulk/action-bulk-update-dialog-comp";
import { UpdateBulkCategoriesSchema } from "../../schemas/categories-schema";

export default function CategoriesBulkFiltersResults() {
  const { filters } = useCategoriesBulkFilters();
  const { mutateAsync: deleteCategories } = useDeleteManyCategories();
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    setShowPreview(false);
  }, [filters]);

  const {
    data: { success, data: categories } = {},
    isLoading: isLoadingCategories,
    isError: getCategoriesError,
  } = useCategories(filters);

  const total = categories?.length ?? 0;

  const {
    data: { data: categoriesWithSub = [] } = {},
    isLoading: isLoadingFull,
    isError: isErrorFull,
  } = useCategories(showPreview ? { subcategories: true, ...filters } : {});

  console.log(filters);

  if (isLoadingCategories) return <div>Loading categories...</div>;
  if (getCategoriesError)
    return <div>Error al obtener categorias filtradas</div>;

  return (
    <>
      <div className="flex flex-col gap-5">
        <p>
          Categorías filtradas para modificar: <strong>{total}</strong>
        </p>

        {total > 0 && (
          <div className="flex flex-col sm:flex-row gap-5">
            <BulkUpdateDialogComponent
              resourceType={"categorías"}
              resourceGenre={"fem"}
              fields={["status"]}
              totalResources={total}
              useResourceBulkFiltersStore={useCategoriesBulkFilters}
              useUpdateManyResources={useUpdateManyCategories}
              updateBulkResourceSchema={UpdateBulkCategoriesSchema}
              defaultUpdateValues={{ status: undefined }}
            />

            <ConfirmBulkDeleteDialog
              totalResources={total}
              resourceType="categorías"
              resourceGenre="fem"
              onConfirmActions={[() => deleteCategories(filters)]}
            />
          </div>
        )}
        {total > 0 && !showPreview && (
          <Button
            onClick={() => setShowPreview(true)}
            className="cursor-pointer sm:w-82"
          >
            Ver previsualización (listar {total} categorías)
          </Button>
        )}
      </div>

      {isLoadingFull && <div>Cargando listado completo...</div>}
      {showPreview && categoriesWithSub && total > 0 && (
        <UiTable
          className="mt-5"
          caption={`Listado de las ${total} categorías seleccionadas con los filtros.`}
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
              categoriesWithSub &&
              categoriesWithSub.map((category: any) => {
                return {
                  rowCells: [
                    { type: "body", text: category.name },
                    { type: "body", text: `$${category._count.subcategories}` },
                    { type: "body", text: category._count.products },
                    {
                      type: "body",
                      text: statusTranslate(category.status, "fem"),
                    },
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
      )}
    </>
  );
}
