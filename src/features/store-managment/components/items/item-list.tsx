"use client";

import React from "react";
import { HomeSection } from "@/types/resources/home-section-types";
import { ItemProductContent } from "./card-contents/product-item";
import { ITEM_TYPE_LABELS } from "../../utils/items-translations";
import { ItemCategoryContent } from "./card-contents/category-item";
import { ItemImageContent } from "./card-contents/image-item";

interface ItemListProps {
  section: HomeSection;
}

export const ItemList = ({ section }: ItemListProps) => {
  console.log(section)
  const items = React.useMemo(() => {
    if (!section.items) return [];

    if (section.type === "PRODUCT_CAROUSEL") {
      return [...section.items].sort(
        (a, b) => (b.product?.relevance ?? 0) - (a.product?.relevance ?? 0)
      );
    }

    return section.items;
  }, [section.items, section.type]);

  if (!items || items.length === 0) {
    return (
      <div
        className="
          border border-dashed rounded-xl p-8
          text-center text-sm text-gray-500
        "
      >
        No hay elementos asociados en esta sección
      </div>
    );
  }

  return (
    <div
      className="
        grid gap-4
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        xl:grid-cols-5
      "
    >
      {items.map((item) => {
        switch (item.itemType) {
          case "PRODUCT":
            return <ItemProductContent key={item.id} item={item} />;

          case "CATEGORY":
            return <ItemCategoryContent key={item.id} item={item} />;

          case "IMAGE":
            return <ItemImageContent key={item.id} item={item} />

          default:
            return (
              <div
                key={item.id}
                className="
                  w-full
                  rounded-xl border p-4
                  text-sm transition-all
                  hover:shadow-sm
                "
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-600 uppercase">
                    {ITEM_TYPE_LABELS[item.itemType] ?? item.itemType}
                  </span>

                  <span className="text-xs text-gray-400">
                    Posición {item.position}
                  </span>
                </div>
              </div>
            );
        }
      })}
    </div>
  );
};
