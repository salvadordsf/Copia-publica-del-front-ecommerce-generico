"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "../stores/cart-store";
import { useCartHydrated } from "../stores/use-cart-hydrated";
import { ShoppingCart } from "lucide-react";
import { IProduct } from "@/types/resources/product-type";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface AddToCartButtonProps {
  product: IProduct;
  quantity: number;
}

export function AddToCartButton({ product, quantity }: AddToCartButtonProps) {
  const hydrated = useCartHydrated();

  //try to get the user session if exist
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const addItem = useCartStore((s) => s.addItem);
  const currentQty = useCartStore(
    (s) => s.items.find((i) => i.productId === product.id)?.quantity ?? 0,
  );

  if (!hydrated || isPending) return null;

  const hasStock = product.stock > 0;
  const canAdd = quantity > 0 && currentQty + quantity <= product.stock;

  return (
    <Button
      size="lg"
      disabled={!canAdd}
      onClick={() => {
        if (session) {
          addItem(product.id, quantity)
        } else {
          router.push("/auth/login");
          //will be set the necesary values for redirect to the page of the prduct by id after login/register
        }
      }}
      className="w-full transition-all hover:scale-[1.01] cursor-pointer"
    >
      {canAdd ? (
        <span>
          Agregar al carrito <ShoppingCart className="inline" />
        </span>
      ) : (
        hasStock? "Stock máximo alcanzado" : "Sin stock"
      )}
    </Button>
  );
}
