"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CreateImageItemSchema,
  ICreateImageItem,
} from "@/features/admin/store-managment/schemas/items/items-schema";
import { useCreateItem } from "@/features/admin/store-managment/services/items/items-mutations";
import { toast } from "sonner";
import { toastError } from "@/utils/toast-error-utility";
import { AxiosError } from "axios";
import ProductBulkFilters from "@/features/admin/products/components/filter/products-filters";
import ProductPreview from "./product-preview";
import MethodsBtns from "@/components/dashboard/btns/btn-request-method";

interface Props {
  sectionId: string;
  items: any[];
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
