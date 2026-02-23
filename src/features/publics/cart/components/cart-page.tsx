"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCartHydrated } from "../stores/use-cart-hydrated";
import { useCartStore } from "../stores/cart-store";
import { CartItemList } from "./cart-item-list";
import { CartTotal } from "./cart-total";

export default function CartPage() {
  const hydrated = useCartHydrated();
  const items = useCartStore((s) => s.items);

  if (!hydrated) return null;

  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8">
      {/*Header*/}
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">Carrito</h1>

        <p className="text-sm text-muted-foreground">
          {totalItems} producto{totalItems !== 1 && "s"} en tu carrito
        </p>
      </header>

      <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
        {/*Items*/}
        <div className="flex flex-col gap-6">
          <CartItemList />
        </div>

        {/*Summary*/}
        <aside className="h-fit rounded-xl border bg-background p-6 shadow-sm lg:sticky lg:top-24">
          <h2 className="mb-6 text-lg font-semibold">Resumen de compra</h2>

          <div className="flex justify-between text-sm">
            <span>Productos</span>
            <span>{totalItems}</span>
          </div>

          {/*Total*/}
          <div className="mt-4 flex justify-between border-t pt-4">
            <span className="text-base font-medium">Total</span>
            <CartTotal />
          </div>

          {/*Action btns*/}
          <div className="mt-6 flex flex-col gap-3">
            <Button className="w-full" disabled={items.length === 0}>
              Continuar compra
            </Button>

            <Button variant="outline" asChild className="w-full">
              <Link href="/home">Seguir comprando</Link>
            </Button>
          </div>
        </aside>
      </section>
    </div>
  );
}
