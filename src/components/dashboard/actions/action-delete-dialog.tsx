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
import { Input } from "@/components/ui/input";

interface ConfirmDeleteDialogProps {
  trigger: React.ReactNode;
  resourceType: string;
  resourceName: string;
  onConfirmAction: () => Promise<void> | void;
}

export default function ConfirmDeleteDialog({
  trigger,
  resourceType,
  resourceName,
  onConfirmAction,
}: ConfirmDeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [confirmationText, setConfirmationText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFirstConfirm = () => {
    setStep(2);
  };

  const handleFinalConfirm = async () => {
    if (confirmationText.toLowerCase() !== "eliminar") {
      toast.error("Debes escribir 'eliminar' para confirmar.");
      return;
    }

    setLoading(true);
    try {
      await onConfirmAction();
      toast.success(`${resourceType.toLocaleUpperCase()} "${resourceName}" eliminado correctamente.`);
      setOpen(false);
    } catch {
      toast.error("Error al eliminar el recurso.");
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {step === 1
              ? `¿Eliminar ${resourceType} "${resourceName}"?`
              : `Escribí "eliminar" para confirmar`}
          </DialogTitle>
          <DialogDescription>
          {step === 1
              ? `Se borrará de manera permanente`
              : `El recurso dejará de aparecer asociado a otros recursos que lo incluyan.`}
          </DialogDescription>
        </DialogHeader>

        {step === 2 && (
          <Input
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
            placeholder="escribí: eliminar"
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
            {loading ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
