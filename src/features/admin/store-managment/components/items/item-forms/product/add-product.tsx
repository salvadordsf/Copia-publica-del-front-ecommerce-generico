"use client";

import ProductBulkFilters from "@/features/admin/products/components/filter/products-filters";
import ProductPreview from "./product-preview";
import { ItemSection } from "@/types/resources/home-section-types";

interface Props {
  sectionId: string;
  items: ItemSection[];
  closeDialog: () => void;
}

export function AddProductItemForm({
  sectionId,
  items,
  closeDialog,
}: Props) {
  return (
    <div>
      <ProductBulkFilters statusFilter={false} />
      <ProductPreview
        sectionId={sectionId}
        items={items}
        closeDialog={closeDialog}
      />
    </div>
  );
}
