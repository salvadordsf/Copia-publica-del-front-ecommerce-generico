"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  IUpdateItemAnnouncement,
  UpdateItemAnnouncementSchema,
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

export function UpdateAnnouncementItemForm({ item, closeDialog }: Props) {
  const {
    data,
    isLoading: isLoadingSection,
    error: errorSection,
  } = useSectionById(item.sectionId);
  const section = data?.success ? data.data : null;

  const { mutate, isPending } = useUpdateItems<IUpdateItemAnnouncement>(
    item.id,
  );

  const methods = useForm<IUpdateItemAnnouncement>({
    resolver: zodResolver(UpdateItemAnnouncementSchema),
    defaultValues: {
      title: item.title ?? undefined,
      subtitle: item.subtitle ?? null,
      linkUrl: item.linkUrl ?? undefined,
      position: item.position,
    },
  });

  const onSubmit = (data: IUpdateItemAnnouncement) => {
    mutate(data, {
      onSuccess: () => {
        toast.success(`Item anuncio "${data.title}" actualizado exitosamente.`);
        closeDialog();
      },
      onError: (e) => {
        toastError(e as AxiosError, "general");
      },
    });
  };

  if (isLoadingSection) return <p>Cargando sección</p>;
  if (errorSection || !section || !item) return <p>Error al cargar sección</p>;

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
            typeof value === "string" && value.trim() === "" ? null : value,
        })}
      />

      {/* LINK */}
      <Input
        placeholder="Link"
        {...methods.register("linkUrl", {
          setValueAs: (value) =>
            typeof value === "string" && value.trim() === "" ? null : value,
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
          Actualizar anuncio
        </Button>
      ) : (
        <Button type="button" className="w-full opacity-50" disabled>
          Actualizar anuncio
        </Button>
      )}
    </form>
  );
}
