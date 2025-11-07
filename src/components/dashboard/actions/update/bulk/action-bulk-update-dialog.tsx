"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { useEffect, useState } from "react";
import GenericForm from "../../../form/generic-create-form/generic-create-form";
import { GenericFormField } from "../../../form/generic-create-form/generic-create-form.types";
import ActionStepCounter from "../../action-step-counter";

interface IBulkUpdateDialog {
  useFormMethods: UseFormReturn<any>;
  openState: [boolean, (val: boolean) => void];
  onSubmitAction: (data: any) => Promise<void> | void;
  fields: GenericFormField[];
  isDisabled?: boolean;
  isError?: boolean;
  serverError?: any;
  resourceType?: string;
  totalResources?: number;
}

export default function BulkUpdateDialog({
  useFormMethods,
  openState,
  onSubmitAction,
  fields,
  isDisabled = false,
  isError,
  serverError,
  resourceType = "productos",
  totalResources = 0,
}: IBulkUpdateDialog) {
  const [open, setOpen] = openState;
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const handleOpenChange = (val: boolean) => {
    if (!val) {
      setStep(1);
      useFormMethods.reset();
    }
    setOpen(val);
  };

  const handleCancel = () => {
    setStep(1);
    useFormMethods.reset();
    setOpen(false);
  };

  const handleNext = (data: any) => {
    setFormData(data);
    setStep(2);
  };

  const handleBack = () => setStep(1);

  const handleConfirm = async () => {
    if (!formData) return;
    setLoading(true);
    try {
      await onSubmitAction(formData);
      setOpen(false);
      useFormMethods.reset();
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) useFormMethods.reset();
  }, [open]);

  // Traducción de claves y valores al español
  const translateKey = (key: string) => {
    const map: Record<string, string> = {
      status: "Estado",
      relevance: "Relevancia",
    };
    return map[key.toLowerCase()] || key;
  };

  const translateValue = (value: string) => {
    const map: Record<string, string> = {
      ACTIVE: "Activo",
      ARCHIVED: "Archivado",
    };
    return map[value.toUpperCase()] || value;
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          onClick={() => console.log("Actualizar")}
          className="bg-blue-500 hover:bg-blue-400 cursor-pointer"
        >
          Actualizar productos
        </Button>
      </DialogTrigger>

      {!isDisabled && (
        <DialogContent className="max-h-[80vh] overflow-y-auto flex flex-col justify-between">
          {/* Contenido principal */}
          <div>
            <DialogHeader>
              <DialogTitle>
                {step === 1
                  ? `Actualizar ${totalResources} ${resourceType}`
                  : `Confirmar actualización de ${totalResources} ${resourceType}`}
              </DialogTitle>
              <DialogDescription>
                {step === 1
                  ? "Completá los campos que deseas actualizar. Dejá los demás vacíos."
                  : "Revisá los cambios antes de confirmar."}
              </DialogDescription>
            </DialogHeader>

            {/* Step 1: Form */}
            {step === 1 && (
              <FormProvider {...useFormMethods}>
                <GenericForm
                  fields={fields}
                  onSubmitAction={handleNext}
                  isError={isError}
                  serverError={serverError}
                  submitButtonText=""
                  submitButtonType="update"
                />
              </FormProvider>
            )}

            {/* Step 2: Confirmation */}
            {step === 2 && (
              <div className="space-y-4 mt-4">
                <h3 className="font-semibold text-lg">Cambios a aplicar:</h3>
                <div className="border p-3 rounded-md bg-muted/30">
                  {Object.entries(formData)
                    .filter(([_, value]) => value !== "" && value !== undefined)
                    .map(([key, value]) => (
                      <p key={key}>
                        <span className="font-medium capitalize">
                          {translateKey(key)}:
                        </span>{" "}
                        <strong>{translateValue(String(value))}</strong>
                      </p>
                    ))}
                  {Object.values(formData).every(
                    (value) => value === "" || value === undefined
                  ) && <p>No hay cambios seleccionados.</p>}
                </div>
              </div>
            )}
          </div>

          {/* Footer + Step Counter */}
          <div className="flex flex-col items-end gap-1">
            <DialogFooter className="flex justify-end items-center gap-3 w-full">
              {step === 1 ? (
                <>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={loading}
                    className="cursor-pointer"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={useFormMethods.handleSubmit(handleNext)}
                    disabled={loading}
                    className="bg-method-put text-white hover:bg-method-put/80 cursor-pointer font-bold"
                  >
                    Siguiente
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={loading}
                    className="cursor-pointer"
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={loading}
                    className="cursor-pointer"
                  >
                    Anterior
                  </Button>
                  <Button
                    onClick={handleConfirm}
                    disabled={loading}
                    className="bg-method-put text-white hover:bg-method-put/80 cursor-pointer font-bold"
                  >
                    {loading ? "Actualizando..." : "Confirmar actualización"}
                  </Button>
                </>
              )}
            </DialogFooter>

            {/* Step Counter */}
            <div className="mr-3">
              <ActionStepCounter step={ step + 1 } stepCount={2} />
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
