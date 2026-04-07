import ContactForm from "@/components/public-store/contact-form/contact-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contáctanos",
  description: "Contáctanos para obtener más información sobre nuestro ecommerce genérico.",
  openGraph: {
    title: "Contáctanos",
    description: "Contáctanos para obtener más información sobre nuestro ecommerce genérico.",
    url: "/home/contacto",
  },
};

export default function ContactoPage() {
  return (
    <section className="container mx-auto mt-10">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Contáctanos
        </h2>
        <p className="mt-4 text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae
          vehicula tellus. Vestibulum eleifend, lacus suscipit sagittis
          hendrerit, nunc lacus venenatis libero, vitae vestibulum nisl lacus
          vitae enim.
        </p>
      </div>

      {/* Contact Form */}
      <ContactForm title="Envianos un mensaje" />
    </section>
  );
}
