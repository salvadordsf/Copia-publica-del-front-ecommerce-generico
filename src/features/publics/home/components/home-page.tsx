"use client";

import { useHome } from "../services/home-query";
import { AnnouncementCarousel } from "./sections/announcement-carousel";
import { useMemo } from "react";
import { BannerCarousel } from "./sections/banner-carousel";
import { HomeSection } from "@/types/resources/home-section-types";
import { ProductCarousel } from "./sections/product-carousel";
import { CategoriesCarousel } from "./sections/category-carousel";
import { TextSection } from "./sections/text";
import { GridSection } from "./sections/grid";
import { HomePageSkeleton } from "@/components/skeletons/public/home/home-skeletons";

export const HomePage = () => {
  const { data, isLoading } = useHome();
  const sections = useMemo( () => (data?.success ? data.data : []), [data])

  const firstAnnouncement = useMemo(
    () =>
      (sections as HomeSection[]).find(
        (section) => section.type === "ANNOUNCEMENT_CAROUSEL",
      ),
    [sections],
  );

  if (true) return <HomePageSkeleton />
  if (!data?.success || !sections.length) return null;

  return (
    <div className="flex flex-col gap-10">
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

      <div className="flex flex-col gap-5 max-w-7xl xl:my-0 xl:mx-auto sm:px-1 md:px-5">
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
