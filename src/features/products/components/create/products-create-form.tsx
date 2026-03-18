"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import GenericForm from "@/components/dashboard/form/generic-create-form/generic-create-form";
import { useCategories } from "@/features/categories/services/categories-querys";
import { toastError } from "@/utils/toast-error-utility";
import { AxiosError } from "axios";
import { useCreateProduct } from "../../services/products-mutations";
import { CreateProductSchema, ICreateProduct } from "../../schemas/products-schemas";


export default function CreateProductForm() {
  
  const {
    data: { success, data: categories} = {},
    isLoading: isLoadingCategories,
    isError: getCategoriesError,
  } = useCategories({subcategories: true});
  
  const { mutate, isError, error } = useCreateProduct();
  
  const methods = useForm<ICreateProduct>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      tagsAry: []
    }
  });

  const onSubmit = (data: ICreateProduct) => {
    console.log(data);
    mutate(data, {
      onSuccess: () => {
        toast.success(`Producto "${data.name}" creado exitosamente.`);
      },
      onError: (e) => {
        toastError(e as AxiosError, "general");
      },
    });
  };

  if (isLoadingCategories) return <div>Loading categories...</div>
  if (getCategoriesError) return <div>Error al obtener categorías</div>

  return (
    <FormProvider {...methods}>
      <GenericForm
        className="grid grid-cols-2 gap-3 max-w-2xl"
        fields={[
          {
            name: "name",
            label: "Nombre del producto",
            placeholder: "Escribe el nombre del producto",
            type: "text",
            className: "col-start-1 col-end-3 row-start-1",
          },
          {
            name: "description",
            label: "Descripción del producto",
            placeholder: "Escribe la descripción del producto",
            type: "textarea",
            className: "col-start-1 col-end-3 row-start-2",
          },
          {
            name: "price",
            label: "Precio del producto",
            placeholder: "$$$$",
            type: "number",
            min: 1,
            className: "col-start-1 row-start-3",
          },
          {
            name: "stock",
            label: "Stock del producto",
            placeholder: "X cant.",
            type: "number",
            min: 1,
            className: "col-start-2 row-start-3",
          },
          {
            name: "categoryId",
            label: "Categoría",
            selectLabel: "Categorías",
            placeholder: "Seleccionar categoría",
            type: "select",
            options: categories.map((category: any) => {
              return { value: category.id, label: category.name };
            }),
            className: "col-start-1 row-start-4",
          },
          {
            name: "subcategoryId",
            label: "Subcategoría",
            selectLabel: "Subcategorías",
            placeholder: "Seleccionar subcategoría",
            type: "select",
            dependsOn: "categoryId",
            options: categories.flatMap((cat: any) =>
              cat.subcategories.map((sub: any) => ({
                value: sub.id,
                label: sub.name,
                categoryId: cat.id,
              }))
            ),
            className: "col-start-2 row-start-4",
          },
          {
            name: "tagsAry",
            label: "Agregar etiquetas",
            type: "toggle tag",
            className: "col-start-1 col-end-3 row-start-5",
          },
          {
            name: "relevance",
            label: "Relevancia del producto [1 - 6]",
            type: "slider",
            defaultValue: 3,
            min: 1,
            max: 6,
            step: 1,
            ux: {
              uxMinMax: false,
              uxSteps: true,
            },
            className: "col-start-2 row-start-6",
          },
          {
            name: "status",
            label: "Estado del producto",
            type: "radio group",
            options: [
              { value: "ACTIVE", label: "Activo" },
              { value: "ARCHIVED", label: "Archivado" },
            ],
            className: "col-start-1 row-start-6",
          },
        ]}
        submitButtonText="Crear producto"
        submitButtonType="create"
        btnClassName="col-start-1 col-end-3"
        onSubmitAction={(onSubmit)}
        isError={isError}
        serverError={error}
      />
    </FormProvider>
  );
}
