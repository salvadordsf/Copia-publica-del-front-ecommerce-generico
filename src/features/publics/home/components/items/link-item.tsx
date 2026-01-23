"use client";

import React from "react";
import { ItemSection } from "@/types/resources/home-section-types";
import { ItemCard } from "../items-card";
import { ExternalLink, Link as LinkIcon } from "lucide-react";

interface ItemLinkContentProps {
  item: ItemSection;
}

export const ItemLinkContent = ({ item }: ItemLinkContentProps) => {
  const { title, subtitle, linkUrl } = item;

  if (!title || !linkUrl) return null;

  const truncatedLink =
    linkUrl.length > 45 ? `${linkUrl.slice(0, 45)}…` : linkUrl;

  return (
    <ItemCard item={item}>
      <div className="relative flex flex-col justify-center flex-1 px-4 text-center gap-2">
        {/* Badge */}
        <div className="flex items-center justify-center gap-1 text-primary">
          <LinkIcon className="h-4 w-4 text-blue-500" />
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
            Enlace
          </span>
        </div>

        {/* Title */}
        <h3
          className="
            text-base font-semibold text-gray-900
            leading-tight line-clamp-2
          "
          title={title}
        >
          {title}
        </h3>

        {/* Subtitle */}
        {subtitle && (
          <p
            className="
              text-xs text-muted-foreground
              leading-snug line-clamp-2
            "
            title={subtitle}
          >
            {subtitle}
          </p>
        )}

        {/* URL */}
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={linkUrl}
          className="
            inline-flex items-center justify-center gap-1
            text-sm font-medium
            hover:underline
            break-all
            mt-1
            text-blue-500
          "
        >
          {truncatedLink}
          <ExternalLink className="h-4 w-4" />
        </a>

        {/* Accent */}
        <div className="mt-1 h-0.5 w-10 rounded-full bg-blue-500/60 mx-auto" />
      </div>
    </ItemCard>
  );
};
