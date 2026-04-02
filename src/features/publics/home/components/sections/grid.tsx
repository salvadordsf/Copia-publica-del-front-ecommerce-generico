"use client";

import { ImageItem } from "@/components/public-store/home/cards/image-card";
import { LinkItem } from "@/components/public-store/home/cards/link-card";
import { ProductCard } from "@/components/public-store/home/cards/product-card";
import { TextItem } from "@/components/public-store/home/cards/text-card";
import { GridCategoryCard } from "@/components/public-store/home/grid-category-card";
import { HomeSection, ItemSection } from "@/types/resources/home-section-types";
import React from "react";

interface GridSectionProps {
  section: HomeSection;
}

export const GridSection = ({ section }: GridSectionProps) => {
  if (!section.items?.length) return null;

  const renderItem = (item: ItemSection) => {
    switch (item.itemType) {
      case "PRODUCT":
        return <ProductCard product={item.product} />;

      case "CATEGORY":
        return <GridCategoryCard category={item.category} />;

      case "IMAGE":
        return <ImageItem item={item} />;

      case "TEXT":
        return <TextItem item={item} />;

      case "LINK":
        return <LinkItem item={item} />;

      default:
        return null;
    }
  };

  return (
    <section className="p-2 my-2">
      {section.title && (
        <div className="flex flex-col gap-1 pb-6">
          <h3 className="text-2xl font-semibold tracking-tight text-neutral-900">
            {section.title}
          </h3>
          <div className="h-px w-8 bg-neutral-300" />
        </div>
      )}
      <div
        className="
          grid
          grid-cols-2
          sm:gap-x-4
          sm:grid-cols-4
          lg:grid-cols-4
          xl:gap-x-6
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-4
        "
      >
        {section.items
          .sort((a, b) => a.position - b.position)
          .map((item) => (
            <div key={item.id} className="h-full">
              {renderItem(item)}
            </div>
          ))}
      </div>
    </section>
  );
};
