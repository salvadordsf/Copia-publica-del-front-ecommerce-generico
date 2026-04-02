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
  IUpdateItemText,
  UpdateItemTextSchema,
} from "../../../schemas/items/items-schema";

interface Props {
  item: ItemSection;
  closeDialog: () => void;
}

export function UpdateTextItemForm({ item, closeDialog }: Props) {
  const {
    data,
    isLoading: isLoadingSection,
    error: errorSection,
  } = useSectionById(item.sectionId);
  const section = data?.success ? data.data : null;

  const { mutate, isPending } = useUpdateItems<IUpdateItemText>(item.id);

  const methods = useForm<IUpdateItemText>({
    resolver: zodResolver(UpdateItemTextSchema),
    defaultValues: {
      title: item.title ?? undefined,
      subtitle: item.subtitle ?? undefined,
      linkUrl: item.linkUrl ?? undefined,
      position: item.position,
    },
  });

  const onSubmit = (data: IUpdateItemText) => {
    mutate(data, {
      onSuccess: () => {
        toast.success(`Item texto actualizado exitosamente.`);
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
      <Input placeholder="Título del texto" {...methods.register("title")} />
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
          Actualizar texto
        </Button>
      ) : (
        <Button type="button" className="w-full opacity-50" disabled>
          Actualizar texto
        </Button>
      )}
    </form>
  );
}
