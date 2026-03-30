"use client";

import {
  CreateSectionSchema,
  ICreateSection,
} from "@/features/admin/store-managment/schemas/sections/sections-schema";
import { useCreateSection } from "@/features/admin/store-managment/services/sections/sections-mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import UiSelect from "../form/ui-select";
import { useSections } from "@/features/admin/store-managment/services/sections/sections-query";
import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import MethodsBtns from "@/components/dashboard/btns/btn-request-method";
import { toast } from "sonner";
import { toastError } from "@/utils/toast-error-utility";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const AddSectionForm = ({}) => {
  const router = useRouter();

  const { data, isLoading, error: getError } = useSections({});
  const sections = data?.success ? data.data : [];

  const {
    mutate,
    isPending: isCreating,
    isSuccess: isCreated,
  } = useCreateSection();

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
        if (res.success) {
          router.push(res.data.id);
        }
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
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h2 className="text-sm font-semibold text-gray-800">
            Crear nueva sección
          </h2>
          <p className="text-xs text-gray-500">
            Definí el tipo, posición y configuración básica
          </p>
        </div>

        {/* Grid container */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Type */}
          <div>
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
            {/* Errors (selects) */}
            {(methods.formState.errors.type ||
              methods.formState.errors.position) && (
              <div className="text-xs m-1 text-red-500">
                {methods.formState.errors.type?.message ||
                  methods.formState.errors.position?.message}
              </div>
            )}
          </div>

          {/* Position */}
          <div>
            <Controller
              control={methods.control}
              name="position"
              render={({ field }) => (
                <UiSelect
                  label="Posición"
                  items={positionsAbl.map((pos) => ({
                    value: pos.toString(),
                    label: pos.toString(),
                  }))}
                  value={field.value?.toString()}
                  onChange={(val) => field.onChange(Number(val))}
                />
              )}
            />
            {methods.formState.errors.position && (
              <span className="text-xs m-1 text-red-500">
                {methods.formState.errors.position.message}
              </span>
            )}
          </div>

          {/* Title */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">
              Título de sección{" "}
              <span className="text-gray-400 font-normal">(opcional)</span>
            </label>
            <Input
              {...methods.register("title")}
              type="text"
              placeholder="Ejemplo: Productos destacados"
            />
            {methods.formState.errors.title && (
              <span className="text-xs m-1 text-red-500">
                {methods.formState.errors.title.message}
              </span>
            )}
          </div>

          {/* Config */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">
              Configuración extra{" "}
              <span className="text-gray-400 font-normal">(opcional)</span>
            </label>
            <Input
              {...methods.register("config")}
              type="text"
              placeholder="JSON, flags, etc."
            />
            {methods.formState.errors.config && (
              <span className="text-xs m-1 text-red-500">
                {methods.formState.errors.config.message}
              </span>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <MethodsBtns
            selectedType="create"
            isDisabled={isCreating || isCreated}
          >
            {isCreating
              ? "Creando sección..."
              : isCreated
                ? "Redirigiendo..."
                : "Agregar sección"}
          </MethodsBtns>
        </div>
      </div>
    </form>
  );
};
