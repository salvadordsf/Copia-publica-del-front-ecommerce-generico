"use client";

import React from "react";
import { ISubcategory } from "@/types/resources/subcategory-type";
import { slugify } from "@/utils/slugify";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SubcategoryCardProps {
  subcategory: ISubcategory;
}

export const SubcategoryCard = ({ subcategory }: SubcategoryCardProps) => {
  return (
    <Link
      href={`/home/subcategoria/${slugify(subcategory.name)}?id=${subcategory.id}`}
      className={cn(
        "group flex h-18 w-full max-w-[160px] items-center justify-center",
        "rounded-xl border border-neutral-200 bg-white",
        "transition-all duration-200 ease-out",
        "hover:border-neutral-300 hover:shadow-md",
      )}
    >
      <span className="px-3 text-center text-xs font-semibold uppercase tracking-wide text-neutral-800 md:text-sm">
        {subcategory.name}
      </span>
    </Link>
  );
};
