"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CreateImageItemSchema,
  ICreateImageItem,
} from "@/features/admin/store-managment/schemas/items/items-schema";
import { useCreateItem } from "@/features/admin/store-managment/services/items/items-mutations";
import { toast } from "sonner";
import { toastError } from "@/utils/toast-error-utility";
import { AxiosError } from "axios";

interface Props {
  sectionId: string;
  itemsLength: number;
  closeDialog: () => void;
}

export function AddImageItemForm({
  sectionId,
  itemsLength,
  closeDialog,
}: Props) {
  const { mutate, isPending } = useCreateItem();

  const methods = useForm<ICreateImageItem>({
    resolver: zodResolver(CreateImageItemSchema),
    defaultValues: {
      sectionId,
      itemType: "IMAGE",
      position: itemsLength + 1,
    },
  });

  const onSubmit = (data: ICreateImageItem) => {
    mutate(data, {
      onSuccess: () => {
        toast.success(`Item imagen creada exitosamente.`);
        closeDialog();
      },
      onError: (e) => {
        toastError(e as AxiosError, "general");
      },
    });
  };

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
      {/* TITLE */}
      <Input
        placeholder="Título (opcional - recomendado para accesibilidad)"
        {...methods.register("title", {
          setValueAs: (value) =>
            typeof value === "string" && value.trim() === ""
              ? undefined
              : value,
        })}
      />

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

      {/* IMAGE */}
      <Input
        placeholder="URL de imagen"
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

      {/* LINK */}
      <Input
        placeholder="Link"
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

      {/* POSITION */}
      <Input
        type="number"
        min={1}
        max={itemsLength + 1}
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
          Agregar imagen
        </Button>
      ) : (
        <Button type="button" className="w-full opacity-50" disabled>
          Agregar imagen
        </Button>
      )}
    </form>
  );
}
