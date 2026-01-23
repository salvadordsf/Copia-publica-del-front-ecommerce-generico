"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CreateAnnouncementItemSchema,
  ICreateAnnouncementItem,
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

export function AddAnnouncementItemForm({
  sectionId,
  itemsLength,
  closeDialog,
}: Props) {
  const { mutate, isPending } = useCreateItem();

  const methods = useForm<ICreateAnnouncementItem>({
    resolver: zodResolver(CreateAnnouncementItemSchema),
    defaultValues: {
      sectionId,
      itemType: "ANNOUNCEMENT",
      position: itemsLength + 1,
    },
  });

  const onSubmit = (data: ICreateAnnouncementItem) => {
    mutate(data, {
      onSuccess: () => {
        toast.success(`Item anuncio "${data.title}" creado exitosamente.`);
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
      <Input placeholder="Título del anuncio" {...methods.register("title")} />
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
          Agregar anuncio
        </Button>
      ) : (
        <Button type="button" className="w-full opacity-50" disabled>
          Agregar anuncio
        </Button>
      )}
    </form>
  );
}
