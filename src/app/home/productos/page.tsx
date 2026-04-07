import ProductsResultsPage from "@/features/publics/products/components/results-page/products-result-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resultados de productos",
  description: "Explora los resultados de productos en nuestro ecommerce genérico.",
  openGraph: {
    title: "Resultados de productos",
    description: "Explora los resultados de productos en nuestro ecommerce genérico.",
    url: "/home/productos"
  }
};

export default function ProductsResultsDedicatedPage() {
  return (
    <>
      <ProductsResultsPage />
    </>
  );
}
