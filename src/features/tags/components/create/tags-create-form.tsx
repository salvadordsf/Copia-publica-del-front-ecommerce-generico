"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTag } from "../../services/tags-mutations";
import { CreateTagSchema, ICreateTagSchema } from "../../schemas/tags-schema";
import { toast } from "sonner";
import { GenericFormField } from "@/components/dashboard/form/generic-create-form/generic-create-form.types";
import GenericForm from "@/components/dashboard/form/generic-create-form/generic-create-form";
import { toastError } from "@/utils/toast-error-utility";
import { AxiosError } from "axios";

export default function CreateTagForm() {
  const { mutate, isError, error } = useCreateTag();

  const methods = useForm<ICreateTagSchema>({
    resolver: zodResolver(CreateTagSchema),
  });

  const onSubmit = (data: ICreateTagSchema) => {
    mutate(data, {
      onSuccess: () => {
        toast.success(`Etiqueta "${data.name}" creada exitosamente.`);
      },
      onError: (e) => {
        toastError(e as AxiosError, "general");
      },
    });
  };

  const formFields: GenericFormField[] = [
    {
      name: "name",
      label: "Nombre de la etiqueta",
      placeholder: "Escribe el nombre de la etiqueta",
      type: "text",
    },
  ];

  return (
    <FormProvider {...methods}>
      <GenericForm
        fields={formFields}
        submitButtonText="Crear etiqueta"
        submitButtonType="create"
        onSubmitAction={onSubmit}
        isError={isError}
        serverError={error}
      />
    </FormProvider>
  );
}
