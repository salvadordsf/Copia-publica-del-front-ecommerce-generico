"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdateItems } from "@/features/admin/store-managment/services/items/items-mutations";
import { toast } from "sonner";
import { toastError } from "@/utils/toast-error-utility";
import { AxiosError } from "axios";
import { ItemSection } from "@/types/resources/home-section-types";
import { useSectionById } from "../../../services/sections/sections-query";
import {
  IUpdateItemPosition,
  UpdateItemPositionSchema,
} from "../../../schemas/items/items-schema";

interface Props {
  item: ItemSection;
  closeDialog: () => void;
}

export function UpdateCategoryItemForm({ item, closeDialog }: Props) {
  const {
    data: { data: section } = {},
    isLoading: isLoadingSection,
    error: errorSection,
  } = useSectionById(item.sectionId);

  const { mutate, isPending } = useUpdateItems<IUpdateItemPosition>(item.id);

  const updatedItem = section.items.find(
    (updated: ItemSection) => item.id === updated.id,
  );

  const methods = useForm<IUpdateItemPosition>({
    resolver: zodResolver(UpdateItemPositionSchema),
    defaultValues: {
      position: updatedItem.position,
    },
  });

  const onSubmit = (data: IUpdateItemPosition) => {
    mutate(data, {
      onSuccess: () => {
        toast.success(
          `Item categoría "${updatedItem.category.name}" actualizada exitosamente.`,
        );
        closeDialog();
      },
      onError: (e) => {
        toastError(e as AxiosError, "general");
      },
    });
  };

  if (isLoadingSection) return <p>Cargando sección</p>;
  if (errorSection || !section) return <p>Error al cargar sección</p>;

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
      {/* POSITION */}
      <Input
        type="number"
        min={1}
        max={section.items.length}
        {...methods.register("position", {
          valueAsNumber: true,
        })}
      />
      {methods.formState.errors.position && (
        <p className="text-sm text-red-500">
          {methods.formState.errors.position.message}
        </p>
      )}

      {!isPending ? (
        <Button type="submit" className="w-full">
          Actualizar categoría
        </Button>
      ) : (
        <Button type="button" className="w-full opacity-50" disabled>
          Actualizar categoría
        </Button>
      )}
    </form>
  );
}
