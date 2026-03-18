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
import ActionStepCounter from "../action-step-counter";

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
  const isNotDeleted = resourceStatus !== "DELETED";

  const handleFirstConfirm = () => {
    setStep(2);
  };

  const handleFinalConfirm = async () => {
    if (isNotDeleted) {
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
      if (isNotDeleted) {
        //Delete
        await onConfirmActions[0]();
      } else {
        //Restore
        await onConfirmActions[1]({ status: "ARCHIVED" });
      }
      toast.success(
        `${resourceType.toLocaleUpperCase()} "${resourceName}" ${
          isNotDeleted ? "eliminado" : "restaurado"
        } correctamente.`
      );
      setOpen(false);
    } catch {
      toast.error(
        `Error al ${isNotDeleted ? "eliminar" : "restaurar"} el recurso.`
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
        <Button
          variant="outline"
          className={`${
            isNotDeleted
              ? "bg-red-700 hover:bg-red-700/80"
              : "bg-green-700 hover:bg-green-700/80"
          } text-white hover:cursor-pointer hover:text-white font-bold`}
        >
          {isNotDeleted ? "Eliminar" : "Restaurar"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {step === 1
              ? `¿${
                  isNotDeleted ? "Eliminar" : "Restaurar"
                } ${resourceType} "${resourceName}"?`
              : `Escribí "${
                  isNotDeleted ? "eliminar" : "restaurar"
                }" para confirmar`}
          </DialogTitle>
          <DialogDescription>
            {step === 1
              ? isNotDeleted
                ? `Se borrará de manera permanente`
                : "El recurso se restaurará"
              : isNotDeleted
              ? `El recurso dejará de aparecer asociado a otros recursos que lo incluyan.`
              : "El recurso dejará de estár borrado y se archivará."}
          </DialogDescription>
        </DialogHeader>

        {step === 2 && (
          <Input
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
            placeholder={
              isNotDeleted ? "escribí: eliminar" : "escribí: restaurar"
            }
            className="mt-2"
            disabled={loading}
          />
        )}

        <DialogFooter className="mt-4">
          <div className="flex flex-col content-end items-end">
            <div className="flex justify-end gap-2 mt-4">
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
                onClick={step === 1 ? handleFirstConfirm : handleFinalConfirm}
                disabled={loading}
                className={`${
                  isNotDeleted
                    ? "bg-red-700 hover:bg-red-700/80"
                    : "bg-green-700 hover:bg-green-700/80"
                } text-white hover:cursor-pointer hover:text-white font-bold`}
              >
                {loading
                  ? isNotDeleted
                    ? "Eliminando..."
                    : "Restaurando..."
                  : isNotDeleted
                  ? step === 1
                    ? "Eliminar"
                    : "Confirmar eliminción"
                  : step === 1
                  ? "Restaurar"
                  : "Confirmar restaurción"}
              </Button>
            </div>

            <ActionStepCounter step={step + 1} stepCount={2} />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
