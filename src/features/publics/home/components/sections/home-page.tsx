"use client";

import { HomeSection } from "@/types/resources/home-section-types";
import { useHome } from "../../services/home-query";
import { BannerCarousel } from "./banner-carousel";
import { CategoriesCarousel } from "./category-carousel";
import { GridSection } from "./grid";
import { ProductCarousel } from "./product-carousel";
import { TextSection } from "./text";
import { AnnouncementCarousel } from "./announcement-carousel";
import { useMemo } from "react";

export const HomePage = () => {
  const { data: { success, data: sections = [] } = {} } = useHome();

  const firstAnnouncement = useMemo(
    () =>
      (sections as HomeSection[]).find(
        (section) => section.type === "ANNOUNCEMENT_CAROUSEL"
      ),
    [sections]
  );

  if (!success || !sections.length) return null;

  return (
    <div className="flex flex-col gap-5">
      {/* Full width sections */}
      {sections.map((section: HomeSection) => {
        if (section.type === "BANNER") {
          return <BannerCarousel key={section.id} section={section} />;
        }

        if (
          section.type === "ANNOUNCEMENT_CAROUSEL" &&
          section.id !== firstAnnouncement?.id
        ) {
          return <AnnouncementCarousel key={section.id} section={section} />;
        }

        return null;
      })}

      <div className="max-w-7xl xl:my-0 xl:mx-auto sm:px-1 md:px-5">
        {sections.map((section: HomeSection) => {
          switch (section.type) {
            case "CATEGORY_CAROUSEL":
              return <CategoriesCarousel key={section.id} section={section} />;

            case "PRODUCT_CAROUSEL":
              return <ProductCarousel key={section.id} section={section} />;

            case "TEXT":
              return <TextSection key={section.id} section={section} />;

            case "GRID":
              return <GridSection key={section.id} section={section} />;

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};
