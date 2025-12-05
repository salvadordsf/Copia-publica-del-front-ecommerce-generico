"use client";

import { ShoppingCart, User } from "lucide-react";
import { MainNavLogo } from "./main-nav-logo";
import { CustomSidebarTrigger } from "../../sidebar/public-sidebar-toggle";
import { MainSearcher } from "../searcher/main-searcher";
import Link from "next/link";

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


        <div className="lg:flex flex-1 justify-center px-4">
          <MainSearcher />
        </div>

        {/* RIGHT: Icons */}
        <div className="flex items-center gap-3">
          <Link href="/home/cuenta">
            <User />
          </Link>
          <ShoppingCart />
        </div>

      </div>
    </nav>
  );
};
