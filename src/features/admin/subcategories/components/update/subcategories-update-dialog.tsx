"use client";

import { Skeleton } from "@/components/ui/skeleton";
import UpdateDialog from "@/components/dashboard/actions/update/action-update-dialog";
import { useState } from "react";
import { useCategories } from "@/features/admin/categories/services/categories-querys";
import { useUpdateSubcategory } from "../../services/subcategories-mutations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IUpdateSubcategory,
  UpdateSubcategorySchema,
} from "../../schemas/subcategories-schema";
import { AxiosError } from "axios";
import { toastError } from "@/utils/toast-error-utility";
import { toast } from "sonner";
import UpdateConfirmDialog from "@/components/dashboard/actions/update/action-update-confirmation-dialog";
import { ICategory } from "@/types/resources/category-type";

interface Props {
  subcategoryId: string;
  initialName: string;
  initialCategoryId: string;
}

export default function UpdateSubcategoryDialog({
  subcategoryId,
  initialName,
  initialCategoryId,
}: Props) {
  //Get categories for select
  const {
    data,
    isLoading,
    isError: isErrorGetCategories,
  } = useCategories({});
  const categories = data?.success ? data.data : [];
  
  //Update hook
  const { mutateAsync, isError, error } = useUpdateSubcategory(subcategoryId);

  //State for open/close dialog
  const [open, setOpen] = useState(false);

  //Form methods for Dialog > GenericForm
  const methods = useForm<IUpdateSubcategory>({
    resolver: zodResolver(UpdateSubcategorySchema),
    defaultValues: {
      name: initialName,
      categoryId: initialCategoryId,
    },
  });

  //onSubmit form > try Update hook + toast
  const onSubmit = async (data: IUpdateSubcategory) => {
    try {
      await mutateAsync(data);
      toast.success("Subcategoría actualizada correctamente.");
    } catch (error) {
      toastError(error as AxiosError, "general");
    } finally {
      setOpen(false);
    }
  };

  //Loading (skeleton)
  if (isLoading) return <Skeleton className="w-23 h-9" />;

  return (
    <UpdateDialog<IUpdateSubcategory>
      useFormMethods={methods}
      isDisabled={isErrorGetCategories}
      openState={[open, setOpen]}
      dialogConfig={{
        title: `Actualizar subcategoría "${initialName}"`,
        desc: "Los cambios son permanentes.",
      }}
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
          options: categories.map((category: ICategory) => {
            return { value: category.id, label: category.name };
          }),
        },
      ]}
      submitBtnConfig={{
        text: "Actualizar subcategoría",
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
              original: initialName,
              edited: methods.getValues().name,
            },
            {
              label: "Categoría",
              original: categories.filter((category: ICategory) => {
                if (category.id === initialCategoryId) return category;
              })[0].name,
              edited: categories.filter((category: ICategory) => {
                if (category.id === methods.getValues().categoryId)
                  return category;
              })[0].name,
            },
          ]}
        />,
      ]}
    />
  );
}
