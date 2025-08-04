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
import GenericForm from "../form/generic-create-form/generic-create-form";
import { FormProvider } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { GenericFormField } from "../form/generic-create-form/generic-create-form.types";
import { toastError } from "@/utils/toast-error-utility";

interface IUpdateDialog {
  useFormMethods: any;
  isDisabled?: boolean;
  openState: [boolean, Dispatch<SetStateAction<boolean>>];
  dialogConfig: {
    title?: string;
    desc?: string;
  }
  fields: GenericFormField[];
  submitBtnConfig?: {
    text?: string;
    type: "create" | "search" | "update" | "delete";
  };
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
  onSubmitAction,
  isError,
  serverError,
}: IUpdateDialog) {

  //Detect any problem and trhow an toast error
  if (isDisabled) toastError({status: 3000}, "general");

  return (
    <Dialog open={openState[0]} onOpenChange={openState[1]}>
      <DialogTrigger asChild>
        <Button
          disabled={isDisabled}
          variant="outline"
          className="bg-method-put text-white hover:bg-method-put/90 hover:cursor-pointer hover:text-white"
        >
          Actualizar
        </Button>
      </DialogTrigger>
      {!isDisabled && <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogConfig.title}</DialogTitle>
          <DialogDescription>{dialogConfig.desc}</DialogDescription>
        </DialogHeader>
        <FormProvider {...useFormMethods}>
          <GenericForm
            fields={fields}
            submitButtonText={submitBtnConfig.text as string}
            submitButtonType={submitBtnConfig.type}
            onSubmitAction={onSubmitAction}
            isError={isError}
            serverError={serverError}
          />
        </FormProvider>
      </DialogContent>}
    </Dialog>
  );
}
