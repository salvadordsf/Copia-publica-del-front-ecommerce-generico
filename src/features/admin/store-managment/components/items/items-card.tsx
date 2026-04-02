"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { ItemSection } from "@/types/resources/home-section-types";
import { useDeleteItems } from "@/features/admin/store-managment/services/items/items-mutations";
import { toast } from "sonner";
import { UpdateSectionItemDialog } from "./update-item-dialog";

interface ItemCardProps {
  item: ItemSection;
  children: React.ReactNode;
}

export const ItemCard = ({ item, children }: ItemCardProps) => {
  const { position } = item;

  //Update logic
  const [openUpdate, setOpenUpdate] = useState(false);

  //Delete logic
  const {
    mutate: deleteItem,
    isPending: deletePending,
    isSuccess: deleteSuccess,
  } = useDeleteItems();

  const onDeleteItem = (id: string) => {
    deleteItem(id, {
      onSuccess: () => {
        toast.success("Elemento eliminado correctamente.");
      },
      onError: () => {
        toast.error("Error al intentar eliminar elemento.");
      },
    });
  };

  return (
    <>
      <Card
        className={`
        group relative flex flex-col overflow-hidden rounded-xl
        bg-white border shadow-sm transition-all duration-200
        h-[300px]
        ${
          item.itemType === "PRODUCT" && item.product.stock <= 0
            ? ""
            : "hover:shadow-md hover:border-primary/30"
        }
      `}
      >
        {/*Position (and relevance for PRODUCT itemType)*/}
        <div className="absolute top-2 left-2 z-10 flex gap-1">
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

          {/* Relevancia for PRODUCT*/}
          {item.itemType === "PRODUCT" && (
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
              R{item.product.relevance}
            </div>
          )}
        </div>

        {/*Actns btns */}
        <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            className="
              h-8 w-8 rounded-md
              bg-method-put text-white
              hover:opacity-90 hover:bg-method-put
              shadow-sm cursor-pointer
            "
            onClick={() => setOpenUpdate(true)}
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
            onClick={() => onDeleteItem(item.id)}
            disabled={deletePending || deleteSuccess}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/*Card content for each itemType*/}
        <CardContent className="flex flex-col flex-1 p-0 overflow-hidden">
          {children}
        </CardContent>
      </Card>

      <UpdateSectionItemDialog
        open={openUpdate}
        closeDialog={() => setOpenUpdate(false)}
        item={item}
      />
    </>
  );
};
