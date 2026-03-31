"use client";

import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProductById } from "@/features/admin/products/services/products-querys";
import { useCartHydrated } from "../stores/use-cart-hydrated";
import { useCartStore } from "../stores/cart-store";
import Image from "next/image";

interface CartItemProps {
  productId: string;
  quantity: number;
}

export function CartItem({ productId, quantity }: CartItemProps) {
  const hydrated = useCartHydrated();

  const { data, isLoading, isError } = useProductById(productId);

  //gert the cart fn from the cart store
  const updateQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  if (!hydrated) return null;

  if (isLoading) {
    return (
      <div className="flex items-center gap-4 py-4">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (isError || !data || !data.success) return null;

  const product = data.data;
  const cartQty = quantity;
  const visualStock = Math.max(0, product.stock - cartQty);
  const totalPrice = product.price * quantity;
  const image =
    product.imageUrls?.[0] ??
    "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

  const increase = () => {
    if (visualStock <= 0) return;
    updateQuantity(product.id, quantity + 1);
  };
  const decrease = () => {
    if (quantity <= 1) return;
    updateQuantity(product.id, quantity - 1);
  };

  return (
    <div className="rounded-xl border bg-background p-4 shadow-sm">
      <div className="flex gap-4">
        {/*Image*/}
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border">
          <Image
            src={image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/*Content*/}
        <div className="flex flex-1 flex-col justify-between gap-2">
          {/*Name + delete btn*/}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-sm font-medium leading-snug line-clamp-2">
              {product.name}
            </h3>

            <Button
              size="icon"
              variant="ghost"
              onClick={() => removeItem(product.id)}
              className="h-8 w-8 text-destructive shrink-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {/*Quantity controlls + price*/}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/*Quantity + available stock*/}
            <div className="flex items-center justify-between gap-4 sm:justify-start">
              <div className="flex items-center rounded-lg border">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={decrease}
                  disabled={quantity <= 1}
                  className="rounded-none rounded-l-lg"
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <span className="w-10 text-center text-sm font-medium">
                  {quantity}
                </span>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={increase}
                  disabled={visualStock <= 0}
                  className="rounded-none rounded-r-lg"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <span className="text-xs text-muted-foreground whitespace-nowrap">
                Stock: {visualStock}
              </span>
            </div>

            {/*Prices*/}
            <div className="flex items-end justify-between sm:flex-col sm:items-end sm:justify-center">
              <span className="text-xs text-muted-foreground">
                ${product.price.toLocaleString("es-AR")} c/u
              </span>

              <span className="text-base font-semibold">
                ${totalPrice.toLocaleString("es-AR")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
