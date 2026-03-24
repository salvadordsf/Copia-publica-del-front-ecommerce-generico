"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Truck, ShieldCheck } from "lucide-react";
import TextSlider from "./generic-text-slider";
import useInView from "../generic-use-in-view";

const items = [
  {
    icon: ShoppingBag,
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    icon: Truck,
    title: "Dolor Sit",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    icon: ShieldCheck,
    title: "Consectetur",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export default function GenericOne() {
  const sectionB = useInView();

  return (
    <section className="max-w-3xl mx-auto py-20 bg-muted/40">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Generic Section 1
          </h2>
          <p className="mt-4 text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-3 mb-24">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <Card
                key={index}
                className="rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <CardHeader className="flex flex-col items-center text-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>

                <CardContent className="text-center text-sm text-muted-foreground">
                  {item.description}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Animated Section */}
        <div
          ref={sectionB.ref}
          className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${
            sectionB.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          {/* Text */}
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">
              Lorem Ipsum Dolor
            </h3>
            <p className="text-muted-foreground mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>

            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Lorem ipsum dolor sit amet
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Consectetur adipiscing elit
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Sed do eiusmod tempor
              </li>
            </ul>
          </div>

          {/* Visual Card */}
          <div
            className={`transition-all duration-700 delay-200 ${
              sectionB.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 p-10 shadow-inner">
              <div className="aspect-square rounded-2xl bg-background shadow-md flex items-center justify-center">
                <span className="text-muted-foreground text-sm">
                  Imagen o ilustración aquí
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Text Slider */}
      <TextSlider />
    </section>
  );
}
