"use client";

import React from "react";
import { ItemSection } from "@/types/resources/home-section-types";
import { ItemCard } from "@/features/admin/store-managment/components/items/items-card";
import Image from "next/image";

interface ItemImageContentProps {
  item: ItemSection;
}

export const ItemImageContent = ({ item }: ItemImageContentProps) => {
  const { imageUrl, title, subtitle, linkUrl } = item;

  const imageSrc =
    imageUrl ??
    "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

  const truncatedLink =
    linkUrl && linkUrl.length > 40 ? `${linkUrl.slice(0, 40)}…` : linkUrl;

  return (
    <ItemCard item={item}>
      {/* Image */}
      <div className="relative w-full flex-1 bg-gray-100 overflow-hidden aspect-square">
        <Image
          src={imageSrc}
          alt={title ?? "Imagen de sección"}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="
            w-full h-full
            object-contain
            transition-transform duration-300
            group-hover:scale-[1.03]
          "
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Content */}
      {(title || subtitle || linkUrl) && (
        <div className="p-3 flex flex-col gap-1 text-center">
          {title && (
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
              {title}
            </h3>
          )}

          {subtitle && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {subtitle}
            </p>
          )}

          {linkUrl && (
            <a
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-1 text-xs text-primary
                hover:underline
                break-all
              "
              title={linkUrl}
            >
              {truncatedLink}
            </a>
          )}
        </div>
      )}
    </ItemCard>
  );
};
