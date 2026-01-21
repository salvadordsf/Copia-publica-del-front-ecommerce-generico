"use client";

import Link from "next/link";
import { slugify } from "@/utils/slugify";
import { cn } from "@/lib/utils";
import { ICategory } from "@/types/resources/category-type";

interface CategoryCardProps {
  category: ICategory;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link
      href={`/home/categorias/${slugify(category.name)}`}
      className={cn(
        "group flex h-18 w-full max-w-[160px] items-center justify-center",
        "rounded-xl border border-neutral-200 bg-white",
        "transition-all duration-200 ease-out",
        "hover:border-neutral-300 hover:shadow-md",
      )}
    >
      <span className="px-3 text-center text-xs font-semibold uppercase tracking-wide text-neutral-800 md:text-sm">
        {category.name}
      </span>
    </Link>
  );
};
