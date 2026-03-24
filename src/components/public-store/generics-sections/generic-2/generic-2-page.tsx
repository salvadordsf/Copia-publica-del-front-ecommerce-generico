"use client";

import FloatingPills from "./floating-features";
import ContactForm from "../../contact-form/contact-form";

export default function GenericSection2() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Generic Section 2
          </h2>
          <p className="mt-4 text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
            eiusmod tempor incididunt.
          </p>
        </div>

        {/* Features */}
        <FloatingPills />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 text-center items-center max-w-2xl mx-auto">
          {[
            "+10k Users",
            "+500 Products",
            "+120 Orders/day",
            "99% Satisfaction",
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <p className="text-2xl font-bold">{stat}</p>
              <p className="text-xs text-muted-foreground">
                Lorem ipsum dolor sit amet
              </p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <ContactForm />
      </div>
    </section>
  );
}
