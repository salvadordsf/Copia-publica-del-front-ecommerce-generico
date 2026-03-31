"use client";

import { useHome } from "@/features/publics/home/services/home-query";
import { MainNav } from "./main-nav/main-nav";
import { HomeSection } from "@/types/resources/home-section-types";
import { useMemo } from "react";
import { AnnouncementCarousel } from "@/features/publics/home/components/sections/announcement-carousel";

export const MainHeader = () => {
  const { data, isLoading } = useHome();
  const sections = useMemo(() => (data?.success ? data.data : []), [data]);

  const firstAnnouncement = useMemo(
    () =>
      (sections as HomeSection[]).find(
        (section) => section.type === "ANNOUNCEMENT_CAROUSEL",
      ),
    [sections],
  );

  if (isLoading) return <div className="text-center py-10">Cargando...</div>;
  return (
    <div className="pt-20">
      <header className="fixed top-0 left-0 right-0 z-30">
        {firstAnnouncement && (
          <AnnouncementCarousel section={firstAnnouncement} />
        )}
        <MainNav />
      </header>
    </div>
  );
};
