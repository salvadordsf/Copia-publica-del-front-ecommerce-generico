"use client";

import { useHome } from "@/features/store-managment/services/home/home-query";
import { MainNav } from "./main-nav/main-nav";
import { HomeSection } from "@/types/resources/home-section-types";
import { AnnouncementCarousel } from "@/features/store-managment/components/home/announcement-carousel";
import { useMemo } from "react";

export const MainHeader = () => {
  const { data: { success, data: sections = [] } = {} } = useHome();

  const firstAnnouncement = useMemo(
    () =>
      (sections as HomeSection[]).find(
        (section) => section.type === "ANNOUNCEMENT_CAROUSEL"
      ),
    [sections]
  );

  return (
    <header>
      {firstAnnouncement && (
        <AnnouncementCarousel section={firstAnnouncement} />
      )}
      <MainNav />
    </header>
  );
};
