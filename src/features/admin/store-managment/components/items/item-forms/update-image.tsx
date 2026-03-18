"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  IUpdateItemImage,
  UpdateItemImageSchema,
} from "@/features/admin/store-managment/schemas/items/items-schema";
import { useUpdateItems } from "@/features/admin/store-managment/services/items/items-mutations";
import { toast } from "sonner";
import { toastError } from "@/utils/toast-error-utility";
import { AxiosError } from "axios";
import { ItemSection } from "@/types/resources/home-section-types";
import { useSectionById } from "../../../services/sections/sections-query";

interface Props {
  item: ItemSection;
  closeDialog: () => void;
}

export function UpdateImageItemForm({ item, closeDialog }: Props) {
  const {
    data: { data: section } = {},
    isLoading: isLoadingSection,
    error: errorSection,
  } = useSectionById(item.sectionId);

  const { mutate, isPending } = useUpdateItems<IUpdateItemImage>(item.id);

  const updatedItem = section.items.find(
    (updated: ItemSection) => item.id === updated.id,
  );

  const methods = useForm<IUpdateItemImage>({
    resolver: zodResolver(UpdateItemImageSchema),
    defaultValues: {
      title: updatedItem.title ?? undefined,
      subtitle: updatedItem.subtitle ?? undefined,
      linkUrl: updatedItem.linkUrl ?? undefined,
      imageUrl: updatedItem.imageUrl ?? undefined,
      position: updatedItem.position,
    },
  });

  const onSubmit = (data: IUpdateItemImage) => {
    mutate(data, {
      onSuccess: () => {
        toast.success(`Item imagen actualizada exitosamente.`);
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
      {/* TITLE */}
      <Input placeholder="Título de la imagen" {...methods.register("title")} />
      {methods.formState.errors.title && (
        <p className="text-sm text-red-500">
          {methods.formState.errors.title.message}
        </p>
      )}

      {/* SUBTITLE */}
      <Input
        placeholder="Subtítulo (opcional)"
        {...methods.register("subtitle", {
          setValueAs: (value) =>
            typeof value === "string" && value.trim() === ""
              ? undefined
              : value,
        })}
      />

      {/* LINK */}
      <Input
        placeholder="Link externo"
        {...methods.register("linkUrl", {
          setValueAs: (value) =>
            typeof value === "string" && value.trim() === ""
              ? undefined
              : value,
        })}
      />
      {methods.formState.errors.linkUrl && (
        <p className="text-sm text-red-500">
          {methods.formState.errors.linkUrl.message}
        </p>
      )}

      {/* IMAGE */}
      <Input
        placeholder="Link imagen"
        {...methods.register("imageUrl", {
          setValueAs: (value) =>
            typeof value === "string" && value.trim() === ""
              ? undefined
              : value,
        })}
      />
      {methods.formState.errors.imageUrl && (
        <p className="text-sm text-red-500">
          {methods.formState.errors.imageUrl.message}
        </p>
      )}

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
          Actualizar imagen
        </Button>
      ) : (
        <Button type="button" className="w-full opacity-50" disabled>
          Actualizar imagen
        </Button>
      )}
    </form>
  );
}
