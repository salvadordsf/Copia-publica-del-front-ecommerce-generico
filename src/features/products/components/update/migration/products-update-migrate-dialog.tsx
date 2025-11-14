import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MigrateProductsForm from "./products-update-migration-form";
import { useState } from "react";
import { IProduct } from "@/types/resources/product-type";

interface Props {
  resourceName: string;
  resourceToUpdateType: "products" | "subcategories";
  resourcesToUpdate: IProduct[];
}

export default function ResourceMigrateDialog({
  resourceName,
  resourceToUpdateType,
  resourcesToUpdate,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    setOpen(false);
  };

  const orderMap = {
    ACTIVE: 1,
    ARCHIVED: 2,
    DELETED: 3,
  };

  const resourcesToUpdateSorted = resourcesToUpdate.sort((a, b) => {
    return orderMap[a.status] - orderMap[b.status];
  });

  return (
    <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
      <DialogTrigger asChild>
        <Button className="font-bold cursor-pointer">
          Migrar{" "}
          {resourceToUpdateType === "products" ? "productos" : "subcategorías"}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Migrar{" "}
            {resourceToUpdateType === "products"
              ? "productos"
              : "subcategorías"}{" "}
            de {resourceName}
          </DialogTitle>
          <DialogDescription>
            Migrar{" "}
            {resourceToUpdateType === "products"
              ? "productos "
              : "subcategorías "}{" "}
            {resourceToUpdateType === "products"
              ? "a otra categoría y/o subcategoría"
              : "a otra categoría"}
            .
          </DialogDescription>
        </DialogHeader>

        <div className="h-full overflow-y-auto py-4">
          {resourceToUpdateType === "products" && (
            <MigrateProductsForm
              products={resourcesToUpdateSorted}
              onConfirm={handleConfirm}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
