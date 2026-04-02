"use client";

import { useSearchParams } from "next/navigation";
import { useProductsFiltersStore } from "../products/stores/products-filters";
import { ProductsResultsContainer } from "../products/components/results-page/products-results-container";
import { ChevronRight, Loader2 } from "lucide-react";
import { useSubcategoryById } from "@/features/admin/subcategories/services/subcategories-querys";
import { useEffect } from "react";
import Link from "next/link";
import { slugify } from "@/utils/slugify";

export function SubcategoryPage() {
  const searchParams = useSearchParams();
  const subcategoryId = searchParams.get("id");
  const resetFilters = useProductsFiltersStore((s) => s.resetFilters);
  const setSubcategory = useProductsFiltersStore((s) => s.setSubcategoryId);

  useEffect(() => {
    resetFilters();
    setSubcategory(subcategoryId ?? undefined);
  }, [resetFilters, setSubcategory, subcategoryId]);

  const { data, isLoading, error } = useSubcategoryById(subcategoryId!);

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="animate-spin text-neutral-300" size={28} />
      </div>
    );

  if (!data?.success || error)
    return (
      <div className="max-w-4xl mx-auto py-16 px-4">
        <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-500">
          Error al cargar la subcategoría
        </div>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">

      {/* Breadcrumb + header */}
      <header className="flex flex-col gap-2">
        <nav className="flex items-center gap-1.5 text-xs text-neutral-400">
          <Link
            href="/home/categorias"
            className="hover:text-neutral-600 transition-colors"
          >
            Categorías
          </Link>
          <ChevronRight size={12} />
          <Link
            href={`/home/categoria/${slugify(data.data.category.name)}?id=${data.data.category.id}`}
            className="hover:text-neutral-600 transition-colors"
          >
            {data.data.category.name}
          </Link>
          <ChevronRight size={12} />
          <span className="text-neutral-600 font-medium">{data.data.name}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">
          {data.data.name}
        </h1>
        <div className="h-px w-10 bg-neutral-200" />
      </header>

      {/* products */}
      {data.data.products.length > 0 && (
        <section className="space-y-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium tracking-widest text-neutral-400 uppercase">
              Resultados
            </p>
            <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
              Productos
            </h2>
            <div className="h-px w-8 bg-neutral-200" />
          </div>
          <ProductsResultsContainer resetFilters={false} />
        </section>
      )}
    </div>
  );
}