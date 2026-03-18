"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "../stores/cart-store";
import { useCartHydrated } from "../stores/use-cart-hydrated";
import { ShoppingCart } from "lucide-react";
import { IProduct } from "@/types/resources/product-type";

interface AddToCartButtonProps {
  product: IProduct;
  quantity: number;
}

export function AddToCartButton({ product, quantity }: AddToCartButtonProps) {
  const hydrated = useCartHydrated();

  const addItem = useCartStore((s) => s.addItem);
  const currentQty = useCartStore(
    (s) => s.items.find((i) => i.productId === product.id)?.quantity ?? 0,
  );

  if (!hydrated) return null;

  const hasStock = product.stock > 0;
  const canAdd = quantity > 0 && currentQty + quantity <= product.stock;

  return (
    <Button
      size="lg"
      disabled={!canAdd}
      onClick={() => addItem(product.id, quantity)}
      className="w-full transition-all hover:scale-[1.01] cursor-pointer"
    >
      {canAdd ? (
        <span>
          Agregar al carrito <ShoppingCart className="inline" />
        </span>
      ) : (
        hasStock? "Sin stock" : "Stock máximo alcanzado"
      )}
    </Button>
  );
}
