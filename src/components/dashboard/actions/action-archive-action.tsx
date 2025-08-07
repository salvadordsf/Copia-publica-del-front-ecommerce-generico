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
import { UseMutationResult } from "@tanstack/react-query";

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

  const handleConfirm = async () => {
    setLoading(true);
    try {
      if (resourceStatus === "ARCHIVED") {
        await onConfirmAction({ status: "ACTIVE" });
      } else if (resourceStatus === "ACTIVE") {
        await onConfirmAction({ status: "ARCHIVED" });
      }
      toast.success(
        `${resourceType.toLocaleUpperCase()} "${resourceName}" ${
          resourceStatus !== "ARCHIVED"
            ? "archivado correctamente."
            : "desarchivado correctamente"
        }`
      );
      setOpen(false);
    } catch {
      toast.error(
        `${
          resourceStatus !== "ARCHIVED"
            ? "Error al archivar."
            : "Error al desarchivar"
        }`
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
        <Button variant="default">
          {resourceStatus !== "ARCHIVED" ? "Archivar" : "Desarchivar"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {`${
              resourceStatus !== "ARCHIVED" ? "¿Archivar" : "¿Desarchivar"
            } ${resourceType} "${resourceName}"?`}
          </DialogTitle>
          <DialogDescription>
            {resourceStatus !== "ARCHIVED"
              ? "El recurso quedará archivado y se podrá desarchivar en cualquier momento."
              : "El recurso quedará desarchivado y se podrá archivar en cualquier momento."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={handleCancel} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="default" onClick={handleConfirm} disabled={loading}>
            {loading
              ? resourceStatus !== "ARCHIVED"
                ? "Archivando..."
                : "Desarchivando..."
              : resourceStatus !== "ARCHIVED"
              ? "Archivar"
              : "Desarchivar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
