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
  }, []);

  const { data, isLoading, error } = useCategoryById(categoryId!);

  if (isLoading)
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="animate-spin text-neutral-400" size={32} />
      </div>
    );

  if (!data?.success || error)
    return (
      <div className="max-w-4xl mx-auto py-16 px-4">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          Error al cargar la categoría
        </div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          <Link
            href={`/home/categorias`}
            className="font-extralight cursor-pointer text-neutral-500 hover:underline hover:text-neutral-600 transition-all"
          >
            Categorías
          </Link>{" "}
          <ChevronRight className="inline" /> {data.data.name}
        </h1>

        <div className="h-px w-full bg-neutral-200" />
      </header>

      {data.data.subcategories.length > 0 && (
        <section
          className="space-y-4"
          onClick={() => console.log(data.data.subcategories)}
        >
          <GenericItemsSlider
            itemsType="subcategoría"
            title="Subcategorías"
            items={data.data.subcategories.map((sub) => [
              { id: sub.id },
              <SubcategoryCard subcategory={sub} />,
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

      {data.data.products.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Productos</h2>
          </div>

          <div className="p-3 md:p-4">
            <ProductsResultsContainer resetFilters={false} />
          </div>
        </section>
      )}
    </div>
  );
}
