"use client";

import { Menu, ShoppingCart, User } from "lucide-react";
import { MainNavLogo } from "./main-nav-logo";

export const MainNav = () => {
  return (
    <nav className="w-full flex flex-col items-center gap-2 px-4 py-2 bg-neutral-100">
      <div className="max-w-5xl">
        <MainNavLogo />
        {/* ROW para mobile (order-2) y para desktop (order-1) */}
        <div className="flex items-center justify-between gap-20 w-3xl">
          <button className="p-2">
            <Menu />
          </button>

          <div className="flex-1 mx-2">
            <div className="w-full h-10 bg-neutral-300 rounded-md"></div>
          </div>

          <div className="flex items-center gap-3 order-3 sm:order-4">
            <User />
            <ShoppingCart />
          </div>
        </div>
      </div>
    </nav>
  );
};
