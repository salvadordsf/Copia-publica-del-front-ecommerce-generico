import GenericOne from "@/components/public-store/generics-sections/generic-1/generic-section-one";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sección Genérica 1",
  description: "Explora la sección genérica 1 en nuestro ecommerce genérico.",
  openGraph: {
    title: "Sección Genérica 1",
    description: "Explora la sección genérica 1 en nuestro ecommerce genérico.",
    url: "/home/generic-1",
  },
};

export default function GenericOnePage() {
  return <GenericOne />;
}
