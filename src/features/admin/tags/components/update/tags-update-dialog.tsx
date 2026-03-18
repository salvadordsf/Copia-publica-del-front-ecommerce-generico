"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CreateTagSchema, ICreateTagSchema } from "../../schemas/tags-schema";
import { toastError } from "@/utils/toast-error-utility";
import { AxiosError } from "axios";
import UpdateDialog from "@/components/dashboard/actions/update/action-update-dialog";
import UpdateConfirmDialog from "@/components/dashboard/actions/update/action-update-confirmation-dialog";
import { useUpdateTag } from "../../services/tags-mutations";

interface Props {
  tagId: string;
  initialName: string;
}

export default function UpdateTagDialog({ tagId, initialName }: Props) {
  //Update hook
  const { mutateAsync, isError, error } = useUpdateTag(tagId);

  //State for open/close dialog
  const [open, setOpen] = useState(false);

  //Form methods for Dialog > GenericForm
  const methods = useForm<ICreateTagSchema>({
    resolver: zodResolver(CreateTagSchema),
    defaultValues: { name: initialName },
  });

  //onSubmit form > try Update hook + toast
  const onSubmit = async (data: ICreateTagSchema) => {
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
        title: `Actualizar etiqueta "${initialName}"`,
        desc: "Los cambios son permanentes.",
      }}
      fields={[
        {
          name: "name",
          label: "Nombre de la etiqueta",
          placeholder: "Escribe el nombre de la etiqueta",
          type: "text",
        },
      ]}
      submitBtnConfig={{
        text: "Actualizar etiqueta",
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
