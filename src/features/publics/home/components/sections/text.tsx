"use client";

import React from "react";
import { HomeSection } from "@/types/resources/home-section-types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface TextSectionProps {
  section: HomeSection;
}

export const TextSection = ({ section }: TextSectionProps) => {
  const item = section.items?.find((i) => i.itemType === "TEXT" && i.title);

  if (!item) return null;

  const { title, subtitle, linkUrl } = item;

  return (
    <article className="mx-auto max-w-4xl text-center space-y-4 my-2">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="mx-auto max-w-2xl text-sm md:text-base text-neutral-600 leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Optional link */}
      {linkUrl && (
        <div className="pt-2">
          <Link
            href={linkUrl}
            className="
                inline-flex items-center gap-1
                text-sm font-medium text-primary
                hover:underline
              "
          >
            Ver más
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </article>
  );
};
