"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import UpdateDialog from "@/components/dashboard/actions/update/action-update-dialog";
import UpdateConfirmDialog from "@/components/dashboard/actions/update/action-update-confirmation-dialog";
import { HomeSection } from "@/types/resources/home-section-types";
import { useUpdateSection } from "@/features/store-managment/services/sections/sections-mutations";
import {
  IUpdateSection,
  UpdateSectionSchema,
  UpdateSectionSchemaForMutation,
} from "@/features/store-managment/schemas/sections/sections-schema";
import { SECTIONS_TYPE_LABELS } from "@/features/store-managment/utils/sections-translations";

interface Props {
  section: HomeSection;
  sectionsLength: number;
}

export default function UpdateSectionDialog({
  section,
  sectionsLength,
}: Props) {
  //Update hook
  const { mutate, isError, error } = useUpdateSection(section.id);

  //State for open/close dialog
  const [open, setOpen] = useState(false);

  //Form methods for Dialog > GenericForm
  const methods = useForm<IUpdateSection>({
    resolver: zodResolver(UpdateSectionSchema),
    defaultValues: {
      position: section.position.toString(),
      isEnabled: section.isEnabled ? "true" : "false",
      title: section.title ? section.title : undefined,
      config: section.config,
    },
  });

  //onSubmit form > try Update hook + toast
  const onSubmit = async (data: IUpdateSection) => {
    const dataToUpdate = UpdateSectionSchemaForMutation.safeParse(data);

    if (dataToUpdate.error) {
      toast.error("Error de esquemas al actualizar sección.");
      return;
    }

    mutate(dataToUpdate.data, {
      onSuccess: () => {
        toast.success(
          `La sección ${SECTIONS_TYPE_LABELS[section.type]} ${
            section.title ? "- ".concat(section.title) : ""
          } se actualizó correctamente`
        );
      },
      onError: () => {
        toast.error("Error al actualizar sección.");
      },
    });
    methods.reset();
    setOpen(false);
  };

  return (
    <UpdateDialog
      useFormMethods={methods}
      openState={[
        open,
        (val: boolean) => {
          setOpen(val);
          methods.reset();
        },
      ]}
      dialogConfig={{
        title: `Actualizar sección ${SECTIONS_TYPE_LABELS[section.type]} ${
          section.title ? "- ".concat(section.title) : ""
        }`,
        desc: "Los cambios son permanentes e impactan al instante.",
      }}
      fields={[
        {
          name: "position",
          label: "Posición de la sección",
          placeholder: "Selecciona un valor",
          type: "select",
          options: Array.from({ length: sectionsLength }, (_v, i) => i + 1).map(
            (num) => {
              const p = num.toString();
              return { value: p, label: p };
            }
          ),
        },
        {
          type: "select",
          name: "isEnabled",
          label: "Cambiar estado: Activar/Desactivar sección",
          options: [
            { label: "Activado", value: "true" },
            { label: "Desactivado", value: "false" },
          ],
        },
        {
          type: "text",
          name: "title",
          label: "Título de la sección",
          placeholder: "Agregar título (opcional)",
        },
        {
          type: "text",
          name: "config",
          label: "Configuración extra",
          placeholder: "JSON, flags, etc.",
        },
      ]}
      submitBtnConfig={{
        text: "Actualizar sección",
        type: "update",
      }}
      onSubmitAction={onSubmit}
      isError={isError}
      serverError={error}
      stepsAry={[
        <UpdateConfirmDialog
          resource={[
            {
              label: "Posición",
              original: section.position.toString(),
              edited: methods.getValues().position?.toString(),
            },
            {
              label: "Estado",
              original: section.isEnabled ? "ACTIVADO" : "DESACTIVADO",
              edited:
                methods.getValues().isEnabled === "true"
                  ? "ACTIVADO"
                  : "DESACTIVADO",
              alert: true,
            },
            {
              label: "Título",
              original: section.title ? section.title : "Sin título",
              edited: methods.getValues().title
                ? methods.getValues().title
                : "Sin título",
            },
          ]}
        />,
      ]}
    />
  );
}
