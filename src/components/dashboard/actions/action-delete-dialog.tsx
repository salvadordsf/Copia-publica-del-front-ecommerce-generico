// components/ConfirmDeleteDialog.tsx
"use client";

import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";

interface ConfirmDeleteDialogProps {
  resourceStatus: "ACTIVE" | "ARCHIVED" | "DELETED";
  resourceType: string;
  resourceName: string;
  onConfirmActions: (Promise<any> | any)[];
}

export default function ConfirmDeleteDialog({
  resourceStatus,
  resourceType,
  resourceName,
  onConfirmActions,
}: ConfirmDeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [confirmationText, setConfirmationText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFirstConfirm = () => {
    setStep(2);
  };

  const handleFinalConfirm = async () => {
    if (resourceStatus !== "DELETED") {
      if (confirmationText.toLowerCase() !== "eliminar") {
        toast.error("Debes escribir 'eliminar' para confirmar.");
        return;
      }
    } else {
      if (confirmationText.toLowerCase() !== "restaurar") {
        toast.error("Debes escribir 'restaurar' para confirmar.");
        return;
      }
    }

    setLoading(true);
    try {
      if (resourceStatus !== "DELETED") {
        //Delete
        await onConfirmActions[0]();
      } else {
        //Restore
        await onConfirmActions[1]({ status: "ARCHIVED" });
      }
      toast.success(
        `${resourceType.toLocaleUpperCase()} "${resourceName}" ${
          resourceStatus !== "DELETED" ? "eliminado" : "restaurado"
        } correctamente.`
      );
      setOpen(false);
    } catch {
      toast.error(
        `Error al ${
          resourceStatus !== "DELETED" ? "eliminar" : "restaurar"
        } el recurso.`
      );
    } finally {
      setLoading(false);
      setStep(1);
      setConfirmationText("");
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setStep(1);
    setConfirmationText("");
  };
  useEffect(() => {
    setStep(1);
    setConfirmationText("");
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          {resourceStatus !== "DELETED" ? "Eliminar" : "Restaurar"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {step === 1
              ? `¿${
                  resourceStatus !== "DELETED" ? "Eliminar" : "Restaurar"
                } ${resourceType} "${resourceName}"?`
              : `Escribí "${
                  resourceStatus !== "DELETED" ? "eliminar" : "restaurar"
                }" para confirmar`}
          </DialogTitle>
          <DialogDescription>
            {step === 1
              ? resourceStatus !== "DELETED"
                ? `Se borrará de manera permanente`
                : "El recurso se restaurará"
              : resourceStatus !== "DELETED"
              ? `El recurso dejará de aparecer asociado a otros recursos que lo incluyan.`
              : "El recurso dejará de estár borrado y se archivará."}
          </DialogDescription>
        </DialogHeader>

        {step === 2 && (
          <Input
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
            placeholder={
              resourceStatus !== "DELETED"
                ? "escribí: eliminar"
                : "escribí: restaurar"
            }
            className="mt-2"
            disabled={loading}
          />
        )}

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={handleCancel} disabled={loading}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={step === 1 ? handleFirstConfirm : handleFinalConfirm}
            disabled={loading}
          >
            {loading
              ? resourceStatus !== "DELETED"
                ? "Eliminando..."
                : "Restaurando..."
              : resourceStatus !== "DELETED"
              ? "Eliminar"
              : "Restaurar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
