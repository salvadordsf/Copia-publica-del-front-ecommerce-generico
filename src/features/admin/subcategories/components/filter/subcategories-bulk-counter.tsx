"use client";

import { statusTranslate } from "@/utils/status-translate";
import { stringToDateToString } from "@/utils/date-to-string-utility";
import { statusRowClassGenerator } from "@/utils/status-row-class-generator";
import UiTable from "@/components/dashboard/table/table";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ConfirmBulkDeleteDialog from "@/components/dashboard/actions/delete/action-bulk-delete-dialog";
import { BulkUpdateDialogComponent } from "@/components/dashboard/actions/update/bulk/action-bulk-update-dialog-comp";
import {
  useDeleteManySubcategories,
  useUpdateManySubcategories,
} from "../../services/subcategories-mutations";
import { useSubcategories } from "../../services/subcategories-querys";
import { IFilterBulkSubcategoriesQuery, IUpdateBulkSubcategories, UpdateBulkSubcategoriesSchema } from "../../schemas/subcategories-schema";
import { useSubcategoriesBulkFilters } from "../../store/subcategories-bulk-filters";
import { ISubcategory } from "@/types/resources/subcategory-type";

export default function SubcategoriesBulkFiltersResults() {
  const { filters } = useSubcategoriesBulkFilters();
  const { mutateAsync: deleteSubcategories } = useDeleteManySubcategories();
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    setShowPreview(false);
  }, [filters]);

  const {
    data,
    isLoading: isLoadingSubcategories,
    isError: getSubcategoriesError,
  } = useSubcategories(filters);
  const subcategories = data?.success ? data.data : [];

  const total = subcategories.length ?? 0;

  const {
    data: subsWithCatsData,
    isLoading: isLoadingFull,
    isError: _isErrorFull,
  } = useSubcategories(showPreview ? { category: true, ...filters } : {});
  const subcategoriesWithCats = subsWithCatsData?.success
    ? subsWithCatsData.data
    : [];

  if (isLoadingSubcategories) return <div>Loading subcategories...</div>;
  if (getSubcategoriesError)
    return <div>Error al obtener subcategorías filtrados</div>;

  return (
    <>
      <div className="flex flex-col gap-5">
        <p>
          Subcategorías filtradas para modificar: <strong>{total}</strong>
        </p>

        {total > 0 && (
          <div className="flex flex-col sm:flex-row gap-5">
            <BulkUpdateDialogComponent<IFilterBulkSubcategoriesQuery, IUpdateBulkSubcategories>
              resourceType={"subcategorías"}
              resourceGenre={"fem"}
              fields={["status", "categoryId"]}
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

      {isLoadingFull && <div>Cargando listado completo...</div>}
      {showPreview && subcategoriesWithCats && total > 0 && (
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
              subcategoriesWithCats &&
              subcategoriesWithCats.map((subcategory: ISubcategory) => {
                return {
                  rowCells: [
                    { type: "body", text: subcategory.name },
                    { type: "body", text: `${subcategory.category.name}` },
                    { type: "body", text: subcategory._count.products },
                    {
                      type: "body",
                      text: statusTranslate(subcategory.status, "fem"),
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
