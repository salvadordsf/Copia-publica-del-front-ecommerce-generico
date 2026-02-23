"use client";

import React from "react";
import { ItemSection } from "@/types/resources/home-section-types";
import { Megaphone, ExternalLink } from "lucide-react";
import { ItemCard } from "@/features/admin/store-managment/components/items/items-card";

interface ItemAnnouncementContentProps {
  item: ItemSection;
}

export const ItemAnnouncementContent = ({
  item,
}: ItemAnnouncementContentProps) => {
  const { title, subtitle, linkUrl } = item;

  const truncatedLink =
    linkUrl && linkUrl.length > 45 ? `${linkUrl.slice(0, 45)}…` : linkUrl;

  return (
    <ItemCard item={item}>
      <div className="relative flex flex-col justify-center flex-1 px-4 text-center gap-2">
        {/* Badge */}
        <div className="flex items-center justify-center gap-1 text-amber-600">
          <Megaphone className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-widest">
            Anuncio
          </span>
        </div>

        {/* Title */}
        <h3
          className="
            text-base font-semibold text-gray-900
            leading-tight line-clamp-3
          "
          title={title!}
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

        {/* CTA link */}
        {linkUrl && (
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={linkUrl}
            className="
              inline-flex items-center justify-center gap-1
              text-sm font-medium text-amber-600
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
        <div className="mt-1 h-0.5 w-10 rounded-full bg-amber-500/70 mx-auto" />
      </div>
    </ItemCard>
  );
};
