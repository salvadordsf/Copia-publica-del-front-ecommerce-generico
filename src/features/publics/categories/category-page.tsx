"use client";

import { useSearchParams } from "next/navigation";
import { useProductsFiltersStore } from "../products/stores/products-filters";
import { ProductsResultsContainer } from "../products/components/results-page/products-results-container";
import { useCategoryById } from "@/features/admin/categories/services/categories-querys";
import { GenericItemsSlider } from "@/components/public-store/items-slider/generic-items-slider";
import { SubcategoryCard } from "../subcategories/subcategory-card";
import { ChevronRight, Loader2 } from "lucide-react";
import { useEffect } from "react";
import Link from "next/link";

export function CategoryPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("id");
  const resetFilters = useProductsFiltersStore((s) => s.resetFilters);
  const setCategory = useProductsFiltersStore((s) => s.setCategoryId);
  setCategory(categoryId ?? undefined);

  useEffect(() => {
    resetFilters();
    setCategory(categoryId ?? undefined);
  }, [resetFilters, setCategory, categoryId]);

  const { data, isLoading, error } = useCategoryById(categoryId!);

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
          Error al cargar la categoría
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
          <span className="text-neutral-600 font-medium">{data.data.name}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">
          {data.data.name}
        </h1>
        <div className="h-px w-10 bg-neutral-200" />
      </header>

      {/* Subcategorías */}
      {data.data.subcategories.length > 0 && (
        <section className="space-y-4">
          <GenericItemsSlider
            itemsType="subcategoría"
            title="Subcategorías"
            items={data.data.subcategories.map((sub) => [
              { id: sub.id },
              <SubcategoryCard subcategory={sub} key={sub.id} />,
            ])}
            slidesSpaceConfig={{
              slidesPerView: 2,
              spaceBetween: 16,
              breakpoints: {
                640: { slidesPerView: 3, spaceBetween: 16 },
                1024: { slidesPerView: 4, spaceBetween: 16 },
                1280: { slidesPerView: 5, spaceBetween: 16 },
              },
            }}
          />
        </section>
      )}

      {/* Productos */}
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