"use client";

import { useSearchParams } from "next/navigation";
import { useProductsFiltersStore } from "../products/stores/products-filters";
import { ProductsResultsContainer } from "../products/components/results-page/products-results-container";
import { ChevronRight, Link2 } from "lucide-react";
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
      <div className="flex justify-center py-16">
        <Link2 className="animate-spin text-neutral-400" size={32} />
      </div>
    );

  if (!data?.success || error)
    return (
      <div className="max-w-4xl mx-auto py-16 px-4">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          Error al cargar la subcategoría
        </div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          <Link
            href={`/home/categoria/${slugify(data.data.category.name)}?id=${data.data.category.id}`}
            className="font-extralight cursor-pointer text-neutral-500 hover:underline hover:text-neutral-600 transition-all"
          >
            {data.data.category.name}
          </Link>{" "}
          <ChevronRight className="inline" />{" "}
          {data.data.name}
        </h1>

        <div className="h-px w-full bg-neutral-200" />
      </header>

      {data.data.products.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Productos</h2>
          </div>

          <div className="p-3 md:p-4">
            <ProductsResultsContainer resetFilters={false}/>
          </div>
        </section>
      )}
    </div>
  );
}
