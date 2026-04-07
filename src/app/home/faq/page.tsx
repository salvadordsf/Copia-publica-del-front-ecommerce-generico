import FAQPage from "@/components/public-store/faq/faq";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes",
  description:
    "Encuentra respuestas a las preguntas más frecuentes sobre nuestro ecommerce genérico.",
  openGraph: {
    title: "Preguntas Frecuentes",
    description:
      "Encuentra respuestas a las preguntas más frecuentes sobre nuestro ecommerce genérico.",
    url: "/home/faq",
  },
};

export default function Faq() {
  return <FAQPage />;
}
