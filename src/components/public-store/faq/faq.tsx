"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ContactForm from "../contact-form/contact-form";
import "@/styles/globals.css";

const featuredFaqs = [
  {
    question: "¿Lorem ipsum dolor sit amet?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "¿Consectetur adipiscing elit?",
    answer:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    question: "¿Sed do eiusmod tempor?",
    answer:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

const allFaqs = [
  "¿Lorem ipsum dolor sit amet?",
  "¿Consectetur adipiscing elit sed do?",
  "¿Eiusmod tempor incididunt ut labore?",
  "¿Ut enim ad minim veniam quis?",
  "¿Duis aute irure dolor in reprehenderit?",
  "¿Excepteur sint occaecat cupidatat?",
];

export default function FAQPage() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Preguntas frecuentes
          </h1>
          <p className="mt-4 text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Featured FAQs */}
        <div className="grid gap-6 md:grid-cols-3 mb-24">
          {featuredFaqs.map((faq, i) => (
            <Card
              key={i}
              className="rounded-2xl hover:shadow-md transition-all"
            >
              <CardHeader>
                <CardTitle className="text-base">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {faq.answer}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Accordion */}
        <div className="max-w-2xl mx-auto mb-24">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Más preguntas frecuentes
          </h2>

          <Accordion type="single" collapsible className="w-full">
            {allFaqs.map((q, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Form */}
        <ContactForm title="Hace tu pregunta"/>
      </div>
    </section>
  );
}
