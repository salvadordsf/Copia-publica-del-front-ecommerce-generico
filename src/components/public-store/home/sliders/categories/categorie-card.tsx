"use client";

import { slugify } from "@/utils/slugify";
import Link from "next/link";

export const CategoryCard = ({ category }: { category: { name: string } }) => {
  return (
    <Link href={`/home/categorias/${slugify(category.name)}`}>
      <div className="flex items-center justify-center h-20 max-w-35 p-5 rounded-sm shadow bg-neutral-200">
        <span className="uppercase font-semibold">{category.name}</span>
      </div>
    </Link>
  );
};
