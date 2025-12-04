import { AnnouncementCarousel } from "./announcement-carousel/announcement-carousel";
import { MainNav } from "./main-nav/main-nav";

export const MainHeader = () => {
  return (
    <div>
      <AnnouncementCarousel />
      <MainNav />
    </div>
  );
};
