"use client";

import React from "react";
import { ItemSection } from "@/types/resources/home-section-types";
import { ItemCard } from "../items-card";

interface ItemCategoryContentProps {
  item: ItemSection;
}

export const ItemCategoryContent = ({ item }: ItemCategoryContentProps) => {
  const { name } = item.category;

  return (
    <ItemCard item={item}>
      <div className="flex flex-col items-center justify-center flex-1 px-4 text-center gap-2">
        <span className="text-xs font-medium uppercase tracking-widest text-primary/70">
          Categoría
        </span>

        <h3 className="text-base font-semibold text-gray-900 leading-tight line-clamp-2">
          {name}
        </h3>

        {/* Accent line */}
        <div className="mt-1 h-0.5 w-8 rounded-full bg-primary/60" />
      </div>
    </ItemCard>
  );
};
