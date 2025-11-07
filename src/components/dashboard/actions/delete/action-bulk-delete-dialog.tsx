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
import ActionStepCounter from "../action-step-counter";

interface ConfirmBulkDeleteDialogProps {
  totalResources: number;
  resourceType: string;
  onConfirmActions: Array<() => Promise<any> | any>;
}

export default function ConfirmBulkDeleteDialog({
  totalResources,
  resourceType,
  onConfirmActions,
}: ConfirmBulkDeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [confirmationText, setConfirmationText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setOpen(false);
    setStep(1);
    setConfirmationText("");
  };

  const handleFirstConfirm = () => setStep(2);

  const handleFinalConfirm = async () => {
    if (confirmationText.trim().toLowerCase() !== "eliminar") {
      toast.error("Debes escribir 'eliminar' para confirmar.");
      return;
    }

    setLoading(true);
    try {
      const res = await onConfirmActions[0]();
      if (res.success) {
        toast.success(
          `${totalResources} ${resourceType} eliminados correctamente.`
        );
      } else if (!res.success) {
        console.error(res.error);
        toast.error(`Error al eliminar los ${totalResources} ${resourceType}.`);
      }
    } catch (e) {
      console.error(e);
      toast.error(`Error al eliminar los ${totalResources} ${resourceType}.`);
    } finally {
      setLoading(false);
      setOpen(false);
      setStep(1);
      setConfirmationText("");
    }
  };

  useEffect(() => {
    if (!open) {
      setStep(1);
      setConfirmationText("");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="hover:bg-red-500 cursor-pointer font-bold"
          variant="destructive"
        >
          Eliminar productos
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {step === 1
              ? `¿Eliminar ${totalResources} ${resourceType}?`
              : `Confirmar eliminación de ${totalResources} ${resourceType}`}
          </DialogTitle>

          <DialogDescription>
            {step === 1
              ? `Esta acción eliminará los ${resourceType} seleccionados.`
              : `Para confirmar, escribe "eliminar" en el campo a continuación.`}
          </DialogDescription>
        </DialogHeader>

        {step === 2 && (
          <Input
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
            placeholder="escribí: eliminar"
            className="mt-3"
            disabled={loading}
            autoFocus
          />
        )}

        <DialogFooter>
          <div className="flex flex-col items-end">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={loading}
                className="cursor-pointer"
              >
                Cancelar
              </Button>

              <Button
                onClick={step === 1 ? handleFirstConfirm : handleFinalConfirm}
                disabled={loading}
                className="bg-red-700 hover:bg-red-700/80 text-white cursor-pointer"
              >
                {loading
                  ? "Eliminando..."
                  : step === 1
                  ? "Eliminar"
                  : "Confirmar"}
              </Button>
            </div>
            <ActionStepCounter step={step + 1} stepCount={2} />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
