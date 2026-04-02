"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCartHydrated } from "../stores/use-cart-hydrated";
import { useCartStore } from "../stores/cart-store";
import { CartItemList } from "./cart-item-list";
import { CartTotal } from "./cart-total";
import CheckoutSteps from "./checkout/checkout-steps";

export default function CartPage() {
  const hydrated = useCartHydrated();
  const items = useCartStore((s) => s.items);

  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);

  if (!hydrated) return null;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">Carrito</h1>

        <p className="text-sm text-muted-foreground">
          {totalItems} producto{totalItems !== 1 && "s"} en tu carrito
        </p>
      </header>

      <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="flex flex-col gap-6">
          <CartItemList />
        </div>

        <aside className="h-fit rounded-xl border bg-background p-6 shadow-sm lg:sticky lg:top-24">
          <div className="flex flex-col gap-6">
            {/* Summary */}
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold">Resumen de compra</h2>

              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Productos</span>
                <span className="font-medium text-foreground">
                  {totalItems}
                </span>
              </div>

              {/* total */}
              <div className="flex items-center justify-between rounded-lg bg-muted/40 px-4 py-3 text-sm">
                <span className="font-medium">Total</span>
                <CartTotal />
              </div>
            </div>

            {/* divider */}
            <div className="border-t" />

            {/* checkout steps */}
            <div className="flex flex-col gap-4">
              <CheckoutSteps />
            </div>

            {/* divider */}
            <div className="border-t" />

            {/* actions */}
            <div className="flex flex-col gap-3">
              <Button variant="outline" asChild className="w-full">
                <Link href="/home">Seguir comprando</Link>
              </Button>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
