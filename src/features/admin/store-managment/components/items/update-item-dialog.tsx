"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ItemSection } from "@/types/resources/home-section-types";
import { UpdateAnnouncementItemForm } from "./item-forms/update-announcement";
import { UpdateImageItemForm } from "./item-forms/update-image";
import { UpdateProductItemForm } from "./item-forms/update-product";
import { UpdateCategoryItemForm } from "./item-forms/update-category";
import { UpdateTextItemForm } from "./item-forms/update-text";
import { UpdateLinkItemForm } from "./item-forms/update-link";

interface Props {
  open: boolean;
  closeDialog: () => void;
  item: ItemSection;
}

export function UpdateSectionItemDialog({ open, closeDialog, item }: Props) {
  const renderFormByType = () => {
    switch (item.itemType) {
      case "ANNOUNCEMENT":
        return (
          <UpdateAnnouncementItemForm item={item} closeDialog={closeDialog} />
        );
      case "IMAGE":
        return <UpdateImageItemForm item={item} closeDialog={closeDialog} />;
      case "PRODUCT":
        return <UpdateProductItemForm item={item} closeDialog={closeDialog} />;
      case "CATEGORY":
        return <UpdateCategoryItemForm item={item} closeDialog={closeDialog} />;
      case "TEXT":
        return <UpdateTextItemForm item={item} closeDialog={closeDialog} />;
      case "LINK":
        return <UpdateLinkItemForm item={item} closeDialog={closeDialog} />;
      case "MIXED":
        return <p>Form MIXED (future feature)</p>;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeDialog()}>
      <DialogContent className="max-h-[85vh] overflow-y-scroll flex flex-col">
        <DialogHeader>
          <DialogTitle>Actualizar item</DialogTitle>
        </DialogHeader>

        {item.itemType && (
          <div className="mt-4 space-y-4">{renderFormByType()}</div>
        )}
      </DialogContent>
    </Dialog>
  );
}
