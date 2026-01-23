"use client";

import { useHome } from "@/features/publics/home/services/home-query";
import { MainNav } from "./main-nav/main-nav";
import { HomeSection } from "@/types/resources/home-section-types";
import { useMemo } from "react";
import { AnnouncementCarousel } from "@/features/publics/home/components/sections/announcement-carousel";

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
