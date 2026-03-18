"use client";

import Link from "next/link";
import { slugify } from "@/utils/slugify";
import { cn } from "@/lib/utils";
import { ICategory } from "@/types/resources/category-type";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  category: ICategory;
}

export const GridCategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link
      href={`/home/categorias/${slugify(category.name)}`}
      className={cn(
        "group relative block w-full",
        "rounded-sm border border-neutral-200 bg-white",
        "p-6 transition-all duration-200 ease-out",
        "hover:border-neutral-300 hover:shadow-md",
        "active:scale-[0.99]"
      )}
    >
      <div className="flex flex-col gap-2">
        {/* Title */}
        <h3 className="text-base font-semibold uppercase tracking-wide text-neutral-900 md:text-lg">
          {category.name}
        </h3>

        {/* CTA */}
        <span
          className={cn(
            "mt-3 inline-flex w-fit items-center gap-1",
            "text-sm font-medium text-neutral-700",
            "transition-colors group-hover:text-neutral-900"
          )}
        >
          Ver más
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
};
