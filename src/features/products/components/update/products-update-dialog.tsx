"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { toastError } from "@/utils/toast-error-utility";
import { AxiosError } from "axios";
import UpdateDialog from "@/components/dashboard/actions/update/action-update-dialog";
import { useUpdateProduct } from "../../services/products-mutations";
import {
  IUpdateProduct,
  UpdateProductSchema,
} from "../../schemas/products-schemas";
import { useCategories } from "@/features/categories/services/categories-querys";
import UpdateConfirmDialog from "@/components/dashboard/actions/update/action-update-confirmation-dialog";

interface Props {
  product: any;
}

export default function UpdateProductDialog({ product }: Props) {
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: getCategoriesError,
  } = useCategories({ subcategories: true });
  const getCategoryName = (id: string) =>
    categories.find((c: any) => c.id === id)?.name || "Sin categoría";

  const getSubcategoryName = (categoryId: string, subcategoryId: string) =>
    categories
      .find((c: any) => c.id === categoryId)
      ?.subcategories.find((s: any) => s.id === subcategoryId)?.name ||
    "Sin subcategoría";
  //Update hook
  const { mutateAsync, isError, error } = useUpdateProduct(product.id);

  //State for open/close dialog
  const [open, setOpen] = useState(false);

  //Form methods for Dialog > GenericForm
  const methods = useForm<IUpdateProduct>({
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: Number(product.price),
      stock: product.stock,
      categoryId: product.categoryId,
      subcategoryId: product.subcategoryId,
      tagsAry: product.tagsAry,
      relevance: product.relevance,
    },
  });

  //onSubmit form > try Update hook + toast
  const onSubmit = async (data: IUpdateProduct) => {
    try {
      await mutateAsync(data);
      toast.success("Producto actualizada correctamente.");
    } catch (error) {
      toastError(error as AxiosError, "general");
    } finally {
      setOpen(false);
    }
  };
  console.log(product.tags);
  if (isLoadingCategories) return <div>Loading categories...</div>;
  if (getCategoriesError) return <div>Error al obtener categorías</div>;
  return (
    <UpdateDialog
      useFormMethods={methods}
      openState={[open, setOpen]}
      dialogConfig={{
        title: `Actualizar producto "${product.name}"`,
        desc: "Los cambios son permanentes.",
      }}
      fields={[
        {
          name: "name",
          label: "Nombre del producto",
          placeholder: "Escribe el nombre del producto",
          type: "text",
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
          defaultValue: product.categoryId,
          className: "col-start-1 row-start-4",
        },
        {
          name: "subcategoryId",
          label: "Subcategoría",
          selectLabel: "Subcategorías",
          placeholder: "Seleccionar subcategoría",
          type: "select",
          dependsOn: "categoryId",
          options: categories.flatMap((cat: any) => {
            return cat.subcategories.map((sub: any) => {
              return {
                value: sub.id,
                label: sub.name,
                categoryId: cat.id,
              };
            });
          }),
          defaultValue: product.subcategoryId,
          className: "col-start-2 row-start-4",
        },
        {
          name: "tagsAry",
          label: "Agregar etiquetas",
          type: "toggle tag",
          className: "col-start-1 col-end-3 row-start-5",
          defaultValue: product.tags,
        },
        {
          name: "relevance",
          label: "Relevancia del producto [1 - 6]",
          type: "slider",
          defaultValue: product.relevance,
          min: 1,
          max: 6,
          step: 1,
          ux: {
            uxMinMax: false,
            uxSteps: true,
          },
          className: "col-start-2 row-start-6",
        },
      ]}
      submitBtnConfig={{
        text: "Actualizar producto",
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
              original: product.name,
              edited: methods.getValues().name,
            },
            {
              label: "Descripción",
              original: product.description,
              edited: methods.getValues().description,
            },
            {
              label: "Precio",
              original: product.price,
              edited: String(methods.getValues().price),
            },
            {
              label: "Stock",
              original: product.stock,
              edited: methods.getValues().stock,
            },
            {
              label: "Categoría",
              original: getCategoryName(product.categoryId),
              edited: getCategoryName(methods.getValues().categoryId ?? ""),
            },
            {
              label: "Subcategoría",
              original: getSubcategoryName(
                product.categoryId,
                product.subcategoryId
              ),
              edited: getSubcategoryName(
                methods.getValues().categoryId ?? "",
                methods.getValues().subcategoryId ?? ""
              ),
            },
            {
              label: "Relevancia",
              original: product.relevance,
              edited: methods.getValues().relevance,
            },
          ]}
        />,
      ]}
    />
  );
}
