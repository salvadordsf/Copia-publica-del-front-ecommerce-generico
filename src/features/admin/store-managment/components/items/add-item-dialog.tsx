"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMemo, useState } from "react";
import UiSelect from "../sections/form/ui-select";
import { ITEM_TYPE_LABELS } from "../../utils/items-translations";
import { AddAnnouncementItemForm } from "./item-forms/add-announcement";
import { AddImageItemForm } from "./item-forms/add-image";
import { AddProductItemForm } from "./item-forms/product/add-product";
import AddCategoryForm from "./item-forms/add-category";
import { AddTextItemForm } from "./item-forms/add-text";
import { AddLinkItemForm } from "./item-forms/add-link";
import { ItemSection } from "@/types/resources/home-section-types";

interface Props {
  open: boolean;
  closeDialog: () => void;
  onOpenChange: (open: boolean) => void;
  section: {
    id: string;
    type:
      | "ANNOUNCEMENT_CAROUSEL"
      | "BANNER"
      | "PRODUCT_CAROUSEL"
      | "CATEGORY_CAROUSEL"
      | "GRID"
      | "TEXT"
      | "CUSTOM";
    items: ItemSection[];
  };
}

export function AddSectionItemDialog({
  open,
  closeDialog,
  onOpenChange,
  section,
}: Props) {
  const SECTION_ITEM_MAP = {
    ANNOUNCEMENT_CAROUSEL: ["ANNOUNCEMENT"],
    BANNER: ["IMAGE"],
    PRODUCT_CAROUSEL: ["PRODUCT"],
    CATEGORY_CAROUSEL: ["CATEGORY"],
    GRID: ["PRODUCT", "IMAGE", "TEXT", "MIXED", "CATEGORY"],
    TEXT: ["LINK", "TEXT"],
    CUSTOM: ["PRODUCT", "IMAGE", "TEXT", "MIXED", "CATEGORY", "LINK"],
  } as const;

  const [itemType, setItemType] = useState<string | null>(null);
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setItemType(null);
    }
    onOpenChange(isOpen);
  };

  const allowedItems = SECTION_ITEM_MAP[section.type];

  const selectItems = useMemo(
    () =>
      allowedItems.map((type) => ({
        value: type,
        label: ITEM_TYPE_LABELS[type] ?? type,
      })),
    [allowedItems]
  );

  const renderFormByType = () => {
    switch (itemType) {
      case "ANNOUNCEMENT":
        return (
          <AddAnnouncementItemForm
            sectionId={section.id}
            itemsLength={section.items?.length ?? 0}
            closeDialog={closeDialog}
          />
        );
      case "IMAGE":
        return (
          <AddImageItemForm
            sectionId={section.id}
            itemsLength={section.items?.length ?? 0}
            closeDialog={closeDialog}
          />
        );
      case "PRODUCT":
        return (
          <AddProductItemForm
            sectionId={section.id}
            items={section.items}
            closeDialog={closeDialog}
          />
        );
      case "CATEGORY":
        return (
          <AddCategoryForm
            sectionId={section.id}
            items={section.items}
            closeDialog={closeDialog}
          />
        );
      case "TEXT":
        return (
          <AddTextItemForm
            sectionId={section.id}
            itemsLength={section.items?.length ?? 0}
            closeDialog={closeDialog}
          />
        );
      case "LINK":
        return (
          <AddLinkItemForm
            sectionId={section.id}
            itemsLength={section.items?.length ?? 0}
            closeDialog={closeDialog}
          />
        );
      case "MIXED":
        return <p>Form MIXED (future feature)</p>;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-scroll flex flex-col">
        <DialogHeader>
          <DialogTitle>Agregar item a la sección</DialogTitle>
        </DialogHeader>

        <UiSelect
          label="Tipo de item"
          placeholder="Seleccionar tipo"
          items={selectItems}
          onChange={(value) => setItemType(value)}
        />

        {itemType && <div className="mt-4 space-y-4">{renderFormByType()}</div>}
      </DialogContent>
    </Dialog>
  );
}
