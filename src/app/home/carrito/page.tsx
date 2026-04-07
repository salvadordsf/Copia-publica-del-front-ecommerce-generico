import CartPage from "@/features/publics/cart/components/cart-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carrito de Ecommerce Genérico",
  description:
    "Revisa los productos que has agregado a tu carrito en nuestro ecommerce genérico.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartDedicatedPage() {
  return <CartPage />;
}
