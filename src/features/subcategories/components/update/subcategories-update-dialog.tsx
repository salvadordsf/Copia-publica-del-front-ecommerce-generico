"use client";

import { Skeleton } from "@/components/ui/skeleton";
import UpdateDialog from "@/components/dashboard/actions/action-update-dialog";
import { useState } from "react";
import { useCategories } from "@/features/categories/services/categories-querys";
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
  let {
    data: categories,
    isLoading,
    isError: isErrorGetCategories,
  } = useCategories({});

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
    <UpdateDialog
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
          options: categories.map((category: any) => {
            return { value: category.id, label: category.name };
          }),
        },
      ]}
      submitBtnConfig={{
        text: "Actualizar subcategoría",
        color: "white",
        bg: "method-put",
      }}
      onSubmitAction={onSubmit}
      isError={isError}
      serverError={error}
    />
  );
}
