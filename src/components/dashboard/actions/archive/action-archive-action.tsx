// components/ConfirmDeleteDialog.tsx
"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ArchiveDialogProps {
  resourceStatus: "ACTIVE" | "ARCHIVED" | "DELETED";
  resourceType: string;
  resourceName: string;
  onConfirmAction: any;
}

export default function ArchiveDialog({
  resourceStatus,
  resourceType,
  resourceName,
  onConfirmAction,
}: ArchiveDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const isArchived = resourceStatus === "ARCHIVED";

  const handleConfirm = async () => {
    setLoading(true);
    try {
      if (isArchived) {
        await onConfirmAction({ status: "ACTIVE" });
      } else if (!isArchived) {
        await onConfirmAction({ status: "ARCHIVED" });
      }
      toast.success(
        `${resourceType.toLocaleUpperCase()} "${resourceName}" ${
          !isArchived
            ? "archivado correctamente."
            : "desarchivado correctamente"
        }`
      );
      setOpen(false);
    } catch {
      toast.error(
        `${!isArchived ? "Error al archivar." : "Error al desarchivar"}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-black text-white hover:bg-black/80 hover:cursor-pointer hover:text-white font-bold"
        >
          {!isArchived ? "Archivar" : "Desarchivar"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {`${
              !isArchived ? "¿Archivar" : "¿Desarchivar"
            } ${resourceType} "${resourceName}"?`}
          </DialogTitle>
          <DialogDescription>
            {!isArchived
              ? "El recurso quedará archivado y se podrá desarchivar en cualquier momento."
              : "El recurso quedará desarchivado y se podrá archivar en cualquier momento."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={loading}
            className="cursor-pointer"
          >
            Cancelar
          </Button>
          <Button
            variant="default"
            onClick={handleConfirm}
            disabled={loading}
            className={`bg-black hover:bg-black/80
             text-white hover:cursor-pointer hover:text-white font-bold`}
          >
            {loading
              ? !isArchived
                ? "Archivando..."
                : "Desarchivando..."
              : !isArchived
              ? "Archivar"
              : "Desarchivar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
