"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import GenericForm from "../../form/generic-create-form/generic-create-form";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { GenericFormField } from "../../form/generic-create-form/generic-create-form.types";
import { toastError } from "@/utils/toast-error-utility";
import { ReactNode, useEffect, useState } from "react";
import ActionStepCounter from "../action-step-counter";

interface IUpdateDialog {
  useFormMethods: UseFormReturn<any>;
  isDisabled?: boolean;
  openState: [boolean, (val: boolean) => void];
  dialogConfig: {
    title?: string;
    desc?: string;
  };
  fields: GenericFormField[];
  submitBtnConfig?: {
    text?: string;
    type: "create" | "search" | "update" | "delete";
  };
  stepsAry: ReactNode[];
  onSubmitAction: (data: any) => void;
  isError: boolean;
  serverError: any;
}

export default function UpdateDialog({
  useFormMethods,
  isDisabled = false,
  openState,
  dialogConfig = {
    title: "Actualizar recurso",
    desc: "Las modificaciones son permanentes",
  },
  fields,
  submitBtnConfig = {
    text: "Actualizar recurso",
    type: "update",
  },
  stepsAry,
  onSubmitAction,
  isError,
  serverError,
}: IUpdateDialog) {
  //Detect any problem and trhow an toast error
  if (isDisabled) toastError({ status: 3000 }, "general");

  //Dialog open/close logic + restart form when reopen dialog
  const [open, setOpen] = openState;
  const handleOpenChange = (val: boolean) => {
    if (!val) {
      setStep(1);
    }
    setOpen(val);
  };
  useEffect(() => {
    if (open) {
      useFormMethods.reset();
    }
  }, [open]);

  //Dialog steps
  const [step, setStep] = useState<number>(1);
  const stepCount = stepsAry.length;
  //Step prev / next logic func
  const handleSteps = (action: "prev" | "next") => {
    if (action === "next") {
      if (step === stepCount + 1) {
        const data = useFormMethods.getValues();
        onSubmitAction(data);
        useFormMethods.reset(data);
      } else {
        setStep((prev) => prev + 1);
      }
    } else {
      if (step > 1) {
        setStep((prev) => prev - 1);
      }
    }
  };
  console.log(useFormMethods.formState.isDirty);
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          disabled={isDisabled}
          variant="outline"
          className="bg-method-put text-white hover:bg-method-put/90 hover:cursor-pointer hover:text-white font-bold"
          onClick={() => setStep(1)}
        >
          Actualizar
        </Button>
      </DialogTrigger>
      {!isDisabled && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogConfig.title}</DialogTitle>
            <DialogDescription>{dialogConfig.desc}</DialogDescription>
          </DialogHeader>

          {/* Steps render logic */}

          {step === 1 ? (
            <FormProvider {...useFormMethods}>
              <GenericForm
                fields={fields}
                submitButtonText={submitBtnConfig.text as string}
                submitButtonType={submitBtnConfig.type}
                onSubmitAction={() => handleSteps("next")}
                isError={isError}
                serverError={serverError}
              />
            </FormProvider>
          ) : (
            <>
              {/*Render the steps in stepAry*/}
              {stepsAry[step - 2]}
              {/*Next/prev Btns*/}
              <div className="flex flex-col content-end items-end">
                <div className="flex justify-end gap-2 mt-4">
                  {step > 1 && (
                    <Button
                      className="cursor-pointer"
                      variant="outline"
                      onClick={() => handleSteps("prev")}
                    >
                      Anterior
                    </Button>
                  )}
                  {step < stepCount + 1 ? (
                    <Button
                      className="font-bold cursor-pointer bg-method-put hover:bg-method-put/80"
                      onClick={() => handleSteps("next")}
                      disabled={!useFormMethods.formState.isDirty}
                    >
                      Siguiente
                    </Button>
                  ) : (
                    <Button
                      className="font-bold cursor-pointer bg-method-put hover:bg-method-put/80"
                      onClick={() => {
                        handleSteps("next");
                      }}
                      disabled={!useFormMethods.formState.isDirty}
                    >
                      Confirmar actualización
                    </Button>
                  )}
                </div>
                <ActionStepCounter step={step - 1} stepCount={stepCount} />
              </div>
            </>
          )}
        </DialogContent>
      )}
    </Dialog>
  );
}
