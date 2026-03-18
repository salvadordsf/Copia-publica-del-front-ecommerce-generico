"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useCreateCategory } from "../../services/categories-mutations";
import {
  CreateCategorySchema,
  ICreateCategory,
} from "../../schemas/categories-schema";
import GenericForm from "@/components/dashboard/form/generic-create-form/generic-create-form";
import { GenericFormField } from "@/components/dashboard/form/generic-create-form/generic-create-form.types";
import { AxiosError } from "axios";
import { toastError } from "@/utils/toast-error-utility";

export default function CreateCategoryForm() {
  const { mutate, isError, error } = useCreateCategory();

  const methods = useForm<ICreateCategory>({
    resolver: zodResolver(CreateCategorySchema),
  });

  const onSubmit = (data: ICreateCategory) => {
    mutate(data, {
      onSuccess: () => {
        toast.success(`Categoría "${data.name}" creada exitosamente.`);
      },
      onError: (e) => {
        toastError(e as AxiosError, "general");
      },
    });
  };

  const formFields: GenericFormField[] = [
    {
      name: "name",
      label: "Nombre de la categoría",
      placeholder: "Escribe el nombre de la categoría",
      type: "text",
    },
  ];

  return (
    <FormProvider {...methods}>
      <GenericForm
        fields={formFields}
        submitButtonText="Crear categoría"
        submitButtonType="create"
        onSubmitAction={onSubmit}
        isError={isError}
        serverError={error}
      />
    </FormProvider>
  );
}
