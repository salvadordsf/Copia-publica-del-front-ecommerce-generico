"use client";

import { ShoppingCart, User } from "lucide-react";
import { MainNavLogo } from "./main-nav-logo";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CustomSidebarTrigger } from "../../sidebar/public-sidebar-toggle";

export const MainNav = () => {
  return (
    <nav className="w-full bg-neutral-100 border-b">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">

        {/* LEFT: Logo + Sidebar trigger */}
        <div className="flex items-center gap-3">
          {/* Solo en mobile */}
          <CustomSidebarTrigger />
          <MainNavLogo />
        </div>

        {/* CENTER: Search input (solo desktop) */}
        <div className="hidden lg:flex flex-1 justify-center px-4">
          <div className="w-full max-w-md h-10 bg-neutral-300 rounded-md" />
        </div>

        {/* RIGHT: Icons */}
        <div className="flex items-center gap-3">
          <User />
          <ShoppingCart />
        </div>

      </div>
    </nav>
  );
};
