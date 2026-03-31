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
      href={`/home/categoria/${slugify(category.name)}?id=${category.id}`}
      className={cn(
        "group flex h-16 w-full max-w-[160px] items-center justify-center",
        "rounded-xl border border-neutral-100 bg-white",
        "shadow-sm transition-all duration-300 ease-out",
        "hover:-translate-y-0.5 hover:shadow-md hover:border-neutral-200 mb-0.5",
      )}
    >
      <span className="px-4 text-center text-[11px] font-medium tracking-wide text-neutral-500 group-hover:text-neutral-800 transition-colors duration-300">
        {category.name}
      </span>
    </Link>
  );
};