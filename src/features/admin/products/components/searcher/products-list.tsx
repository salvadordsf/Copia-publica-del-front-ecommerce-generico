"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useProducts } from "../../services/products-querys";
import UiPagination from "@/components/dashboard/pagination/pagination";
import { useProductsSearchFilters } from "../../stores/products-search-filters-store";
import UiTable from "@/components/dashboard/table/table";
import { stringToDateToString } from "@/utils/date-to-string-utility";
import { statusRowClassGenerator } from "@/utils/status-row-class-generator";
import { statusTranslate } from "@/utils/status-translate";

export default function ProductList() {
  const { filters, setFilters } = useProductsSearchFilters();

  const router = useRouter();

  const {
    data: { success, data: products } = {},
    isLoading,
    isError,
  } = useProducts(filters);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError) return <p>Error al cargar productos.</p>;

  if (products?.data && !products.data.length) {
    return !filters.search ? (
      <p>No se encontraron products.</p>
    ) : (
      <p>
        No se encontraron products al buscar{" "}
        <span className="italic font-semibold">"{filters.search}"</span>.
      </p>
    );
  }

  return (
    <div>
      <UiTable
        caption="Listado de productos"
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
            products.data &&
            products.data.map((product: any) => {
              return {
                onClickAction: () =>
                  router.push(`/admin/dashboard/products/${product.id}`),
                rowCells: [
                  { type: "body", text: product.name },
                  { type: "body", text: `$${product.price}` },
                  { type: "body", text: product.stock },
                  { type: "body", text: product.category.name },
                  { type: "body", text: product.subcategory.name },
                  { type: "body", text: product.relevance },
                  { type: "body", text: statusTranslate(product.status, "masc") },
                  { type: "body", text: stringToDateToString(product.createdAt) },
                  { type: "body", text: stringToDateToString(product.updatedAt) },
                  { type: "body", text: product.archivedAt && stringToDateToString(product.archivedAt) },
                  { type: "body", text: product.deletedAt && stringToDateToString(product.deletedAt) },
                ],
                className: statusRowClassGenerator(product),
              };
            }),
        }}
      />

      <UiPagination
        currentPage={products.pagination.currentPage}
        totalPages={products.pagination.totalPages}
        onPageChangeAction={(pageNum: number) => {
          setFilters({ page: String(pageNum) });
        }}
        pageSize={products.pagination.pageSize}
        onPageSizeAction={(pageSize: number) => {
          setFilters({ pageSize: String(pageSize), page: "1" });
        }}
      />
    </div>
  );
}
