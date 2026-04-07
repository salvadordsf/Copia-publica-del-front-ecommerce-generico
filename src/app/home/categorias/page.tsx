import { CategoriesPublicPage } from "@/features/publics/categories/categories-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categorías",
  description: "Explorá todas las categorías de productos disponibles en nuestro Ecommerce Genérico.",
  openGraph: {
    title: "Categorías",
    description: "Explorá todas las categorías de productos disponibles en nuestro Ecommerce Genérico.",
    url: "/home/categorias",
  },
};

export default function CategoriesDedicatedPage() {
  return (
    <>
      <CategoriesPublicPage />
    </>
  );
}
