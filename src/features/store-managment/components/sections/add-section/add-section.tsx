"use client";

import {
  CreateSectionSchema,
  ICreateSection,
} from "@/features/store-managment/schemas/sections/sections-schema";
import { useCreateSection } from "@/features/store-managment/services/sections/sections-mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import UiSelect from "../form/ui-select";
import { useSections } from "@/features/store-managment/services/sections/sections-query";
import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import MethodsBtns from "@/components/dashboard/btns/btn-request-method";
import { toast } from "sonner";
import { toastError } from "@/utils/toast-error-utility";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const AddSectionForm = ({}) => {
  const router = useRouter();

  const {
    data: { data: sections } = {},
    isLoading,
    error: getError,
  } = useSections({});

  const { mutate, isError, error } = useCreateSection();

  const types = [
    { value: "ANNOUNCEMENT_CAROUSEL", label: "Carrusel de anuncios" },
    { value: "BANNER", label: "Banner" },
    { value: "PRODUCT_CAROUSEL", label: "Carrusel de productos" },
    { value: "CATEGORY_CAROUSEL", label: "Carrusel de categorías" },
    { value: "GRID", label: "Grilla de elementos" },
    { value: "TEXT", label: "Texto" },
    { value: "CUSTOM", label: "Personalizado" },
  ];

  const positionsAbl = useMemo(() => {
    const length = sections?.length ?? 0;

    return Array.from({ length: length + 1 }, (_, i) => i + 1);
  }, [sections]);

  const methods = useForm<ICreateSection>({
    resolver: zodResolver(CreateSectionSchema),
  });

  const onSubmit = async (data: ICreateSection) => {
    mutate(data, {
      onSuccess: (res) => {
        toast.success(`Sección "${data.type}" creada exitosamente.`);
        console.log("Esto", res.data);
        router.push(res.data.id);
      },
      onError: (e) => {
        toastError(e as AxiosError, "general");
      },
    });
  };

  if (isLoading) return <p>Cargando las secciones</p>;
  if (getError) return <p>Error al cargar las secciones</p>;

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5">
        <Controller
          control={methods.control}
          name="type"
          render={({ field }) => (
            <UiSelect
              label="Tipo de sección"
              items={types}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          control={methods.control}
          name="position"
          render={({ field }) => (
            <UiSelect
              label="Posición de sección"
              items={positionsAbl.map((pos) => ({
                value: pos.toString(),
                label: pos.toString(),
              }))}
              value={field.value?.toString()}
              onChange={(val) => field.onChange(Number(val))}
            />
          )}
        />
        <label>
          <h4>
            Título de sección{" "}
            <span className="text-neutral-400">(opcional)</span>
          </h4>
          <Input
            {...methods.register("title")}
            required={false}
            type="text"
            placeholder="Productos destacados"
          />
        </label>
        <label>
          <h4>
            Configuración extra{" "}
            <span className="text-neutral-400">(opcional)</span>
          </h4>
          <Input {...methods.register("config")} type="text" required={false} />
        </label>

        {methods.formState.errors && methods.formState.errors.type && (
          <div>
            <p>{methods.formState.errors.type?.message}</p>
            <p>{methods.formState.touchedFields.type}</p>
          </div>
        )}
        {methods.formState.errors && methods.formState.errors.position && (
          <p>{methods.formState.errors.position?.message}</p>
        )}
        {methods.formState.errors && methods.formState.errors.title && (
          <p>{methods.formState.errors.title?.message}</p>
        )}
        {methods.formState.errors && methods.formState.errors.config && (
          <p>{methods.formState.errors.config?.message}</p>
        )}

        <MethodsBtns selectedType="create">Agregar sección</MethodsBtns>
      </div>
    </form>
  );
};
