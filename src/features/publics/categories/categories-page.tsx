"use client";

import { useCategories } from "@/features/admin/categories/services/categories-querys";
import { ICategory } from "@/types/resources/category-type";
import { slugify } from "@/utils/slugify";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CategoryPageGridSkeleton } from "@/components/skeletons/public/categories/categories-page/categories-home-page-grid-skeleton";
import { CategoriesPageSkeleton } from "@/components/skeletons/public/categories/categories-page/categories-page-skeleton";

export const CategoriesPublicPage = () => {
  const { data, isLoading, isError } = useCategories({
    status: "ACTIVE",
    subcategories: true,
    products: true,
  });
  const categories = data?.success ? data.data : [];

  if (isLoading) return <CategoriesPageSkeleton />

  if (isError || !data?.success)
    return (
      <div className="max-w-4xl mx-auto py-16 px-4">
        <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-500">
          Error al cargar las categorías
        </div>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      {/* Header */}
      <header className="flex flex-col gap-1">
        <p className="text-xs font-medium tracking-widest text-neutral-400 uppercase">
          Explorá
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">
          Todas las categorías
        </h1>
        <div className="h-px w-10 bg-neutral-200 mt-2" />
      </header>

      {/* Grid */}
      {isLoading ? (
        <CategoryPageGridSkeleton count={10} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category: ICategory) => (
            <Link
              href={`/home/categoria/${slugify(category.name)}?id=${category.id}`}
              key={category.id}
              className={cn(
                "group flex flex-col gap-3 rounded-2xl border border-neutral-100 bg-white p-5",
                "shadow-sm transition-all duration-300 ease-out",
                "hover:-translate-y-0.5 hover:shadow-md hover:border-neutral-200",
              )}
            >
              {/* Indicador superior */}
              <div className="flex items-center justify-between">
                <div className="h-1.5 w-6 rounded-full bg-neutral-200 group-hover:bg-neutral-400 transition-colors duration-300" />
                <svg
                  className="w-4 h-4 text-neutral-300 group-hover:text-neutral-500 group-hover:translate-x-0.5 transition-all duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>

              {/* Nombre */}
              <h2 className="text-base font-medium text-neutral-800 group-hover:text-neutral-900 leading-snug transition-colors duration-200">
                {category.name}
              </h2>

              {/* Meta */}
              <div className="flex flex-col gap-0.5 mt-auto">
                {category.subcategories.length > 0 && (
                  <p className="text-xs text-neutral-400">
                    {category.subcategories.length === 1
                      ? "1 subcategoría"
                      : `${category.subcategories.length} subcategorías`}
                  </p>
                )}
                {category.products.length > 0 && (
                  <p className="text-xs text-neutral-400">
                    {category.products.length === 1
                      ? "1 producto"
                      : `${category.products.length} productos`}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
