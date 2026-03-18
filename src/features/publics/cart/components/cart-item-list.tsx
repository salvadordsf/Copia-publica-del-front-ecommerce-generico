"use client";

import { useCartStore } from "../stores/cart-store";
import { useCartHydrated } from "../stores/use-cart-hydrated";
import { CartItem } from "./cart-item";

export function CartItemList() {
  const hydrated = useCartHydrated();

  const items = useCartStore((s) => s.items);

  if (!hydrated) return null;

  if (items.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        Tu carrito está vacío
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <CartItem
          key={item.productId}
          productId={item.productId}
          quantity={item.quantity}
        />
      ))}
    </div>
  );
}
