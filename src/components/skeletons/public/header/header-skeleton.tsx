import { Skeleton } from "@/components/ui/skeleton";
import { AnnounncementCarouselSkeleton } from "./announcement-carousel-skeleton";
import { CustomSidebarTrigger } from "@/components/public-store/sidebar/public-sidebar-toggle";
import { MainNavLogo } from "@/components/public-store/main-header/main-nav/main-nav-logo";
import { MainSearcher } from "@/components/public-store/main-header/searcher/main-searcher";
import { LogIn, ShoppingCart } from "lucide-react";

export const HeaderSkeleton = () => {
  return (
    <div className="pt-20">
      <header className="fixed top-0 left-0 right-0 z-30">
        <AnnounncementCarouselSkeleton />

        {/* MainNav skeleton */}
        <nav className="w-full bg-neutral-100 border-b">
          <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
            {/* Logo + trigger */}
            <div className="flex items-center gap-3">
              <CustomSidebarTrigger />
              <MainNavLogo />
            </div>

            {/* Searcher */}
            <div className="flex flex-1 justify-center px-4">
              <Skeleton className="h-9 w-full max-w-md bg-neutral-200" />
            </div>

            {/* Icons */}
            <div className="flex items-center gap-3">
              <LogIn className="cursor-pointer" />
              <ShoppingCart className="cursor-pointer" />
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};
