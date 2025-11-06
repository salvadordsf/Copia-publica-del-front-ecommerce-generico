"use client";

import { useProductsBulkFilters } from "../../stores/products-bulk-filters";
import { useProducts } from "../../services/products-querys";
import { statusTranslate } from "@/utils/status-translate";
import { stringToDateToString } from "@/utils/date-to-string-utility";
import { statusRowClassGenerator } from "@/utils/status-row-class-generator";
import UiTable from "@/components/dashboard/table/table";
import { useEffect, useState } from "react";

export default function ProductBulkFiltersResults() {
  const { filters } = useProductsBulkFilters();
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

  const total = data?.data?.pagination.totalItems ?? 0;

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
      : {}
  );

  const products = fullData?.data?.data ?? [];

  console.log(filters);

  if (isLoadingProducts) return <div>Loading products...</div>;
  if (getProductsError) return <div>Error al obtener productos filtrados</div>;

  return (
    <>
      <div>
        <p>
          Productos afectados: <strong>{total}</strong>
        </p>
      </div>

      {total > 0 && !showPreview && (
        <button
          onClick={() => setShowPreview(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Ver previsualización
        </button>
      )}
      {isLoadingFull && <div>Cargando listado completo...</div>}
      {showPreview && fullData && (
        <UiTable
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
              products.map((product: any) => {
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
