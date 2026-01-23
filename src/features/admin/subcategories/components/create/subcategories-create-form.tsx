"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import GenericForm from "@/components/dashboard/form/generic-create-form/generic-create-form";
import { useCreateSubcategory } from "../../services/subcategories-mutations";
import { CreateSubcategorySchema, ICreateSubcategory } from "../../schemas/subcategories-schema";
import { useCategories } from "@/features/admin/categories/services/categories-querys";
import { toastError } from "@/utils/toast-error-utility";
import { AxiosError } from "axios";

export default function CreateSubcategoryForm() {
  
  const {
    data: { success, data: categories} = {},
    isLoading,
    isError: getCategoryError,
  } = useCategories({});
  
  const { mutate, isError, error } = useCreateSubcategory();
  
  const methods = useForm<ICreateSubcategory>({
    resolver: zodResolver(CreateSubcategorySchema),
  });

  const onSubmit = (data: ICreateSubcategory) => {
    mutate(data, {
      onSuccess: () => {
        toast.success(`Subcategoría "${data.name}" creada exitosamente.`);
      },
      onError: (e) => {
        toastError(e as AxiosError, "general");
      },
    });
  };

  if (isLoading) return <div>Loading...</div>
  if (getCategoryError) return <div>Error al obtener categorías</div>
  return (
    <FormProvider {...methods}>
      <GenericForm
        fields={[
          {
            name: "name",
            label: "Nombre de la subcategoría",
            placeholder: "Escribe el nombre de la subcategoría",
            type: "text",
          },
          {
            name: "categoryId",
            label: "Categoría padre",
            selectLabel: "Categorías",
            placeholder: "Seleccionar categoría",
            type: "select",
            options: categories.map((category: any) => {
              return {value: category.id, label: category.name}
            })
          },
        ]}
        submitButtonText="Crear subcategoría"
        submitButtonType="create"
        onSubmitAction={onSubmit}
        isError={isError}
        serverError={error}
      />
    </FormProvider>
  );
}
