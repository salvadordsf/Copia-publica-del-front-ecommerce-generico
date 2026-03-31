"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { toastError } from "@/utils/toast-error-utility";
import { AxiosError } from "axios";
import { useUpdateUser } from "../../services/users-mutations";
import { IUpdateUser, UpdateUserSchema } from "../../schemas/user-schemas";
import UpdateConfirmDialog from "@/components/dashboard/actions/update/action-update-confirmation-dialog";
import UpdateDialog from "@/components/dashboard/actions/update/action-update-dialog";
import { IUser } from "@/types/resources/user-type";

interface Props {
  user: IUser;
}

export default function UpdateUserDialog({ user }: Props) {
  //Update hook
  const { mutateAsync, isError, error } = useUpdateUser(user.id);

  //State for open/close dialog
  const [open, setOpen] = useState(false);

  //Form methods for Dialog > GenericForm
  const methods = useForm<IUpdateUser>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: user.name,
      role: user.role,
      status: user.status,
    },
  });

  //onSubmit form > open 2 step dialog + toast error
  const onSubmit = async (data: IUpdateUser) => {
    try {
      await mutateAsync(data);
      toast.success("Usuario actualizada correctamente.");
    } catch (error) {
      toastError(error as AxiosError, "general");
    } finally {
      setOpen(false);
    }
  };

  return (
    <UpdateDialog<IUpdateUser>
      useFormMethods={methods}
      openState={[open, setOpen]}
      dialogConfig={{
        title: `Actualizar usuario "${user.name}"`,
        desc: "Los cambios son permanentes.",
      }}
      fields={[
        {
          name: "name",
          label: "Nombre del usuario",
          placeholder: "Escribe el nombre del usuario",
          type: "text",
          defaultValue: user.name,
        },
        {
          name: "role",
          label: "⚠️ Precaución - Rol del usuario",
          placeholder: "Seleccina el rol",
          type: "select",
          options: [
            { value: "USER", label: "Usuario" },
            { value: "EDITOR", label: "Editor" },
            { value: "ADMIN", label: "Administrador" },
          ],
          defaultValue: user.role,
          className: "bg-yellow-200 p-2 rounded-lg border-2 border-yellow-400",
        },
      ]}
      submitBtnConfig={{
        text: "Actualizar usuario",
        type: "update",
      }}
      onSubmitAction={onSubmit}
      isError={isError}
      serverError={error}
      stepsAry={[
        <UpdateConfirmDialog
          key="update-confirm-dialog-step"
          resource={[
            {
              label: "Nombre",
              original: user.name,
              edited: methods.getValues().name,
            },
            {
              label: "Rol",
              original: user.role,
              edited: methods.getValues().role,
              alert: true,
            },
          ]}
        />
      ]}
    />
  );
}
