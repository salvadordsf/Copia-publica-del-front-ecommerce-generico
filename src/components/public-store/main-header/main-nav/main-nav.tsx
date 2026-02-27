"use client";

import { LogIn, ShoppingCart, User } from "lucide-react";
import { MainNavLogo } from "./main-nav-logo";
import { CustomSidebarTrigger } from "../../sidebar/public-sidebar-toggle";
import { MainSearcher } from "../searcher/main-searcher";
import Link from "next/link";
import { useCartHydrated } from "@/features/publics/cart/stores/use-cart-hydrated";
import { useCartStore } from "@/features/publics/cart/stores/cart-store";
import { authClient } from "@/lib/auth-client";

export const MainNav = () => {
  //try to get the user session if exist
  const { data: session, isPending, error } = authClient.useSession();

  const hydrated = useCartHydrated();
  const items = useCartStore((s) => s.items);

  if (!hydrated) return null;

  return (
    <nav className="w-full bg-neutral-100 border-b">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo + trigger */}
        <div className="flex items-center gap-3">
          <CustomSidebarTrigger />
          <MainNavLogo />
        </div>

        <div className="lg:flex flex-1 justify-center px-4">
          <MainSearcher />
        </div>

        {/* User profile + cart */}
        <div className="flex items-center gap-3">
          {!session?.user ? (
            <>
              <Link href="/auth/login">
                <LogIn className="cursor-pointer" />
              </Link>
              <Link href="/auth/login">
                <ShoppingCart className="cursor-pointer" />
              </Link>
            </>
          ) : (
            <>
              <Link href="/home/cuenta">
                <User />
              </Link>

              <Link href="/home/carrito">
                <div className="relative">
                  <ShoppingCart />
                  {/* Items quantity count */}
                  {items.length > 0 && (
                    <div className="absolute -right-2 -bottom-3 min-w-4 min-h-4 rounded-4xl text-[10px] text-center bg-blue-400 text-gray-50">
                      {items.reduce((acc, item) => acc + item.quantity, 0)}
                    </div>
                  )}
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
