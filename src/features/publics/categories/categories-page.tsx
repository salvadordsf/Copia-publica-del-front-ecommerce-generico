"use client";

import { useCategories } from "@/features/admin/categories/services/categories-querys";
import { ICategory } from "@/types/resources/category-type";
import { slugify } from "@/utils/slugify";
import { ArrowRightCircleIcon, Loader2 } from "lucide-react";
import Link from "next/link";

export const CategoriesPublicPage = () => {
  const {
    data: { success, data: categories = [] } = {},
    isLoading,
    isError,
  } = useCategories({
    status: "ACTIVE",
    subcategories: true,
    products: true,
  });

  if (isLoading)
    return <Loader2 className="animate-spin text-neutral-400" size={32} />;

  if (isError || !success)
    return (
      <div className="max-w-4xl mx-auto py-16 px-4">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          Error al cargar las categorías
        </div>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Categorías
        </h1>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category: ICategory) => (
          <Link
            href={`/home/categoria/${slugify(category.name)}?id=${category.id}`}
            key={category.id}
            className="border rounded-lg p-4 hover:shadow transition-shadow cursor-pointer"
          >
            <h2 className="text-lg font-medium text-violet-700">
              {category.name.toUpperCase()}
              <ArrowRightCircleIcon className="inline-block ml-2 w-4" />
            </h2>
            {category.subcategories.length > 0 && (
              <p className="text-sm text-neutral-500">
                {category.subcategories.length > 1
                  ? `${category.subcategories.length} subcategorías`
                  : "1 subcategoría"}
              </p>
            )}
            {category.products.length > 0 && (
              <p className="text-sm text-neutral-500">
                {category.products.length > 1
                  ? `${category.products.length} productos`
                  : "1 producto"}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};
