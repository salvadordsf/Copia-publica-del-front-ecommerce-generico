"use client";

import React from "react";
import { ItemSection } from "@/types/resources/home-section-types";
import { ItemCard } from "../items-card";
import { FileText, ExternalLink } from "lucide-react";

interface ItemTextContentProps {
  item: ItemSection;
}

export const ItemTextContent = ({ item }: ItemTextContentProps) => {
  const { title, subtitle, linkUrl } = item;

  if (!title) return null;

  const truncatedLink =
    linkUrl && linkUrl.length > 45 ? `${linkUrl.slice(0, 45)}…` : linkUrl;

  return (
    <ItemCard item={item}>
      <div className="flex flex-col justify-center flex-1 px-4 text-center gap-2">
        {/* Badge */}
        <div className="flex items-center justify-center gap-1 text-purple-700">
          <FileText className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-widest">
            Texto
          </span>
        </div>

        {/* Title */}
        <h3
          className="
            text-base font-semibold text-gray-900
            leading-tight line-clamp-3
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
              leading-snug line-clamp-3
            "
            title={subtitle}
          >
            {subtitle}
          </p>
        )}

        {/* Optional link */}
        {linkUrl && (
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={linkUrl}
            className="
              inline-flex items-center justify-center gap-1
              text-sm font-medium text-purple-700
              hover:underline
              break-all
              mt-1
            "
          >
            {truncatedLink}
            <ExternalLink className="h-4 w-4" />
          </a>
        )}

        {/* Accent */}
        <div className="mt-1 h-0.5 w-8 rounded-full bg-purple-500/60 mx-auto" />
      </div>
    </ItemCard>
  );
};
