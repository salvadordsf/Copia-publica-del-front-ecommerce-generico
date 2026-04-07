import GenericSection2 from "@/components/public-store/generics-sections/generic-2/generic-2-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sección Genérica 2",
  description: "Explora la sección genérica 2 en nuestro ecommerce genérico.",
  openGraph: {
    title: "Sección Genérica 2",
    description: "Explora la sección genérica 2 en nuestro ecommerce genérico.",
    url: "/home/generic-2",
  },
};

export default function GenericTwoPage() {
  return <GenericSection2 />;
}
