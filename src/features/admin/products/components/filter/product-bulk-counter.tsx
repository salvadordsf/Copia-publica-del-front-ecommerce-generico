"use client";

import { useProductsBulkFilters } from "../../stores/products-bulk-filters";
import { useProducts } from "../../services/products-querys";
import { statusTranslate } from "@/utils/status-translate";
import { stringToDateToString } from "@/utils/date-to-string-utility";
import { statusRowClassGenerator } from "@/utils/status-row-class-generator";
import UiTable from "@/components/dashboard/table/table";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ConfirmBulkDeleteDialog from "@/components/dashboard/actions/delete/action-bulk-delete-dialog";
import {
  useDeleteManyProducts,
  useUpdateManyProducts,
} from "../../services/products-mutations";
import { BulkUpdateDialogComponent } from "@/components/dashboard/actions/update/bulk/action-bulk-update-dialog-comp";
import {
  IFilterBulkProductsQuery,
  IUpdateBulkProducts,
  UpdateBulkProductsSchema,
} from "../../schemas/products-schemas";
import { IProduct } from "@/types/resources/product-type";

export default function ProductBulkFiltersResults() {
  const { filters } = useProductsBulkFilters();
  const { mutateAsync: deleteProducts } = useDeleteManyProducts();
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    setShowPreview(false);
  }, [filters]);

  const {
    data,
    isLoading: isLoadingProducts,
    isError: getProductsError,
  } = useProducts({
    ...filters,
    pageSize: "10",
  });

  const total = data?.success ? (data?.data?.pagination.totalItems ?? 0) : 0;

  const {
    data: fullData,
    isLoading: isLoadingFull,
    isError: isErrorFull,
  } = useProducts(
    showPreview
      ? {
          ...filters,
          pageSize: total >= 10 ? String(total) : "10",
          category: true,
          subcategory: true,
        }
      : {},
  );

  const products = fullData?.success ? (fullData.data?.data ?? []) : [];

  console.log(filters);

  if (isLoadingProducts) return <div>Loading products...</div>;
  if (getProductsError) return <div>Error al obtener productos filtrados</div>;

  return (
    <>
      <div className="flex flex-col gap-5">
        <p>
          Productos filtrados para modificar: <strong>{total}</strong>
        </p>

        {total > 0 && (
          <div className="flex flex-col sm:flex-row gap-5">
            <BulkUpdateDialogComponent<
              IFilterBulkProductsQuery,
              IUpdateBulkProducts
            >
              resourceType={"productos"}
              resourceGenre={"masc"}
              fields={["status", "relevance"]}
              totalResources={total}
              useResourceBulkFiltersStore={useProductsBulkFilters}
              useUpdateManyResources={useUpdateManyProducts}
              updateBulkResourceSchema={UpdateBulkProductsSchema}
              defaultUpdateValues={{ status: undefined, relevance: undefined }}
            />

            <ConfirmBulkDeleteDialog
              totalResources={total}
              resourceType="productos"
              resourceGenre="masc"
              onConfirmActions={[() => deleteProducts(filters)]}
            />
          </div>
        )}
        {total > 0 && !showPreview && (
          <Button
            onClick={() => setShowPreview(true)}
            className="cursor-pointer sm:w-82"
          >
            Ver previsualización (listar {total} productos)
          </Button>
        )}
      </div>

      {isLoadingFull && <div>Cargando listado completo...</div>}
      {showPreview && fullData && total > 0 && (
        <UiTable
          className="mt-5"
          caption={`Listado de los ${total} productos seleccionados con los filtros.`}
          rows={{
            headerRow: [
              {
                type: "header",
                text: "Nombre",
              },
              {
                type: "header",
                text: "Precio",
              },
              {
                type: "header",
                text: "Stock",
              },
              {
                type: "header",
                text: "Categoría",
              },
              {
                type: "header",
                text: "Subcategoría",
              },
              {
                type: "header",
                text: "Relevancia",
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
              products &&
              products.map((product: IProduct) => {
                return {
                  rowCells: [
                    { type: "body", text: product.name },
                    { type: "body", text: `$${product.price}` },
                    { type: "body", text: product.stock },
                    { type: "body", text: product.category.name },
                    { type: "body", text: product.subcategory.name },
                    { type: "body", text: product.relevance },
                    {
                      type: "body",
                      text: statusTranslate(product.status, "masc"),
                    },
                    {
                      type: "body",
                      text: stringToDateToString(product.createdAt),
                    },
                    {
                      type: "body",
                      text: stringToDateToString(product.updatedAt),
                    },
                    {
                      type: "body",
                      text:
                        product.archivedAt &&
                        stringToDateToString(product.archivedAt),
                    },
                    {
                      type: "body",
                      text:
                        product.deletedAt &&
                        stringToDateToString(product.deletedAt),
                    },
                  ],
                  className: statusRowClassGenerator(product),
                };
              }),
          }}
        />
      )}
    </>
  );
}
