"use client";

import React from "react";
import { ItemSection } from "@/types/resources/home-section-types";
import { ItemCard } from "@/features/admin/store-managment/components/items/items-card";
import Image from "next/image";
import cloudinaryLoader from "@/lib/cloudinary/cloudinary-loader";

interface ItemProductContentProps {
  item: ItemSection;
}

export const ItemProductContent = ({ item }: ItemProductContentProps) => {
  const { name, stock, price, imageUrls } = item.product;

  const imageSrc =
    imageUrls?.[0] ??
    "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

  const outOfStock = stock === 0;

  return (
    <ItemCard item={item}>
      {/*Image */}
      <div className="relative w-full flex-1 bg-gray-100 overflow-hidden aspect-square">
        <Image
          src={imageSrc}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="
            object-cover
            transition-transform duration-300
            group-hover:scale-[1.03]
          "
          loader={cloudinaryLoader}
          quality={75}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        {outOfStock && (
          <div className="absolute inset-0 bg-red-600/50 backdrop-blur-sm flex items-center justify-center">
            <span className="text-white font-semibold text-xs px-3 py-1 rounded-md">
              SIN STOCK
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between p-3">
        <div className="space-y-1 text-center">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
            {name}
          </h3>

          <p className="text-base font-semibold text-primary">${price}</p>
        </div>

        <div className="mt-2 text-center space-y-0.5">
          <p className="text-xs text-muted-foreground">Stock: {stock}</p>
        </div>
      </div>
    </ItemCard>
  );
};
