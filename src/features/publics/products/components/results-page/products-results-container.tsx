"use client";

import { useProducts } from "@/features/admin/products/services/products-querys";
import { Loader2 } from "lucide-react";
import { useProductsFiltersStore } from "../../stores/products-filters";
import UiPagination from "@/components/dashboard/pagination/pagination";
import { useEffect } from "react";
import { ProductCard } from "@/components/public-store/home/cards/product-card";
import { ProductGridSkeleton } from "@/components/skeletons/public/products/products-results-container-skeleton";

export function ProductsResultsContainer({ resetFilters = true }) {
  const filters = useProductsFiltersStore((s) => s.filters);
  const reset = useProductsFiltersStore((s) => s.resetFilters);
  const setPage = useProductsFiltersStore((s) => s.setPage);
  const setPageSize = useProductsFiltersStore((s) => s.setPageSize);

  useEffect(() => {
    if (resetFilters) {
      reset();
    }
  }, [resetFilters, reset]);

  const { data, isLoading, isError } = useProducts(filters);

  const products = data?.success ? data.data.data : [];
  const pagination = data?.success ? data.data.pagination : null;

  if (isLoading) {
    return (<ProductGridSkeleton count={12} />);
  }

  if (isError || !data || !data.success) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        Error al cargar productos
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        No se encontraron productos
      </div>
    );
  }

  return (
    <section>
      <div
        className="
          grid grid-cols-2 gap-4
          sm:grid-cols-4
          lg:grid-cols-4
        "
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-4">
        {pagination && (
          <UiPagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            pageSize={pagination.pageSize}
            onPageChangeAction={(page) => {
              setPage(page);
            }}
            onPageSizeAction={(size) => {
              setPageSize(size);
              setPage(1);
            }}
          />
        )}
      </div>
    </section>
  );
}
