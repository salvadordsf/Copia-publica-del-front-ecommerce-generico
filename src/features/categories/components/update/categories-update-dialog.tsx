"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  IUpdateCategory,
  UpdateCategorySchema,
} from "../../schemas/categories-schema";
import { useUpdateCategory } from "../../services/categories-mutations";
import { toastError } from "@/utils/toast-error-utility";
import { AxiosError } from "axios";
import UpdateDialog from "@/components/dashboard/actions/update/action-update-dialog";
import UpdateConfirmDialog from "@/components/dashboard/actions/update/action-update-confirmation-dialog";

interface Props {
  categoryId: string;
  initialName: string;
}

export default function UpdateCategoryDialog({
  categoryId,
  initialName,
}: Props) {
  //Update hook
  const { mutateAsync, isError, error } = useUpdateCategory(categoryId);

  //State for open/close dialog
  const [open, setOpen] = useState(false);

  //Form methods for Dialog > GenericForm
  const methods = useForm<IUpdateCategory>({
    resolver: zodResolver(UpdateCategorySchema),
    defaultValues: { name: initialName },
  });

  //onSubmit form > try Update hook + toast
  const onSubmit = async (data: IUpdateCategory) => {
    try {
      await mutateAsync(data);
      toast.success("Etiqueta actualizada correctamente.");
    } catch (error) {
      toastError(error as AxiosError, "general");
    } finally {
      setOpen(false);
    }
  };

  return (
    <UpdateDialog
      useFormMethods={methods}
      openState={[open, setOpen]}
      dialogConfig={{
        title: `Actualizar categoría "${initialName}"`,
        desc: "Los cambios son permanentes.",
      }}
      fields={[
        {
          name: "name",
          label: "Nombre de la categoría",
          placeholder: "Escribe el nombre de la categoría",
          type: "text",
        },
      ]}
      submitBtnConfig={{
        text: "Actualizar categoría",
        type: "update",
      }}
      onSubmitAction={onSubmit}
      isError={isError}
      serverError={error}
      stepsAry={[
        <UpdateConfirmDialog
          resource={[
            {
              label: "Nombre",
              original: initialName,
              edited: methods.getValues().name,
            },
          ]}
        />,
      ]}
    />
  );
}
