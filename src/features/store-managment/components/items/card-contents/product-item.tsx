"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { ItemSection } from "@/types/resources/home-section-types";

interface ItemProductContentProps {
  item: ItemSection;
}

export const ItemProductContent = ({ item }: ItemProductContentProps) => {
  const { position } = item;
  const { name, stock, price, imageUrls, relevance } = item.product;

  const imageSrc =
    imageUrls?.[0] ??
    "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

  const outOfStock = stock === 0;

  return (
    <Card
      className={`
        group relative flex flex-col overflow-hidden rounded-xl
        bg-white border shadow-sm transition-all duration-200
        h-[300px]
        ${outOfStock ? "opacity-60" : "hover:shadow-md hover:border-primary/30"}
      `}
    >
      {/* Posición del item */}
      {/* Posición y Relevancia */}
      <div className="absolute top-2 left-2 z-10 flex gap-1">
        {/* Posición */}
        <div
          className="
      h-8 w-8 rounded-full
      bg-primary text-white
      flex items-center justify-center
      text-[11px] font-semibold
      shadow-sm
    "
          title="Posición en la sección"
        >
          P{position}
        </div>

        {/* Relevancia */}
        <div
          className="
      h-8 w-8 rounded-full
      bg-amber-500 text-white
      flex items-center justify-center
      text-[11px] font-semibold
      shadow-sm
    "
          title="Relevancia del producto"
        >
          R{relevance}
        </div>
      </div>

      {/* Acciones */}
      <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        <Button
          size="icon"
          className="
            h-8 w-8 rounded-md
            bg-method-put text-white
            hover:opacity-90 hover:bg-method-put
            shadow-sm cursor-pointer
          "
        >
          <Pencil className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          className="
            h-8 w-8 rounded-md
            bg-method-delete text-white
            hover:opacity-80 hover:bg-method-delete
            shadow-sm cursor-pointer
          "
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Imagen */}
      <div className="relative w-full h-[58%] bg-gray-100 overflow-hidden">
        <img
          src={imageSrc}
          alt={name}
          className="
            w-full h-full
            object-cover
            transition-transform duration-300
            group-hover:scale-[1.03]
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        {outOfStock && (
          <div className="absolute inset-0 bg-red-600/50 backdrop-blur-sm flex items-center justify-center">
            <span className="text-white font-semibold text-xs px-3 py-1 rounded-md">
              SIN STOCK
            </span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <CardContent className="flex flex-col justify-between p-3 h-[42%]">
        <div className="space-y-1 text-center">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
            {name}
          </h3>

          <p className="text-base font-semibold text-primary">${price}</p>
        </div>

        <div className="mt-2 text-center space-y-0.5">
          <p className="text-xs text-muted-foreground">Stock: {stock}</p>
        </div>
      </CardContent>
    </Card>
  );
};
