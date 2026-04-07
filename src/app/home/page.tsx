import { HomePage } from "@/features/publics/home/components/home-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio",
  description: "Bienvenido a nuestro ecommerce genérico. Explora nuestros productos y encuentra lo que necesitas.",
  openGraph: {
    url: "/home"
  }
}

export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}
