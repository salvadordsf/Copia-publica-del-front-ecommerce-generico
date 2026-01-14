"use client";

import { useSectionById } from "@/features/store-managment/services/sections/sections-query";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddSectionItemDialog } from "../../items/add-item-dialog";
import { SectionCard } from "../cards/section-card";
import { ITEM_TYPE_LABELS } from "@/features/store-managment/utils/items-translations";
import MethodsBtns from "@/components/dashboard/btns/btn-request-method";
import { SECTIONS_TYPE_LABELS } from "@/features/store-managment/utils/sections-translations";
import ConfirmDeleteDialog from "@/components/dashboard/actions/delete/action-delete-dialog";
import { useDeleteSection } from "@/features/store-managment/services/sections/sections-mutations";
import { toast } from "sonner";

export const SectionInfo = () => {
  const router = useRouter();

  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  if (!id) return <p>ID inválido</p>;

  const { data: { data: section } = {}, isLoading, error } = useSectionById(id);

  //Delete logic
  const { mutate } = useDeleteSection();
  const deleteSection = () => {
    mutate(section.id, {
      onSuccess: () => {
        toast.success(`La sección ${SECTIONS_TYPE_LABELS[section.type]} ${section.title ? "- ".concat(section.title) : ""} se eliminó correctamente`)
        router.push("/admin/dashboard/home-store/sections")
      },
      onError: () => {
        toast.error("Error al intentar eliminar sección");
      }
    });
  }

  if (isLoading) return <p>Cargando sección</p>;
  if (error || !section) return <p>Error al cargar sección</p>;

  return (
    <section className="flex flex-col gap-5">
      {/* Section info */}
      <div
        className={`
        w-full flex flex-col gap-2
        rounded-xl border p-4
        transition-all
        ${
          section.isEnabled
            ? "border-green-500/40 bg-green-50/30"
            : "border-gray-300 bg-white"
        }
        
      `}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-gray-800 uppercase">
              {SECTIONS_TYPE_LABELS[section.type]}
            </h3>
            <span className="text-xs text-gray-500">
              Posición: {section.position}
            </span>
          </div>

          {/* Status */}
          <span
            className={`
            px-2 py-0.5 rounded-full text-xs font-medium
            ${
              section.isEnabled
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-700"
            }
          `}
          >
            {section.isEnabled ? "ACTIVA" : "DESACTIVADA"}
          </span>
        </div>

        {/* Optional title */}
        {section.title && (
          <p className="text-xs text-gray-600 truncate">{section.title}</p>
        )}

        {/* Date info */}
        <div className="mt-1 flex flex-col gap-0.5 text-xs text-gray-400">
          <span>
            Creada el{" "}
            <time dateTime={section.createdAt}>
              {new Date(section.createdAt).toLocaleDateString()}
            </time>
          </span>
          <span>
            Actualizada el{" "}
            <time dateTime={section.updatedAt}>
              {new Date(section.updatedAt).toLocaleDateString()}
            </time>
          </span>
        </div>
        {/* Section actions */}
        <div
          className="
          flex flex-col gap-2
          sm:flex-row sm:items-center sm:justify-end
        "
        >
          <MethodsBtns
            selectedType="update"
            onClickAct={() => setOpenEdit(true)}
            extraClassName="
            m-0
          "
          >
            Editar sección
          </MethodsBtns>

          
          <ConfirmDeleteDialog 
            resourceStatus="ACTIVE"
            resourceType="sección"
            resourceName={SECTIONS_TYPE_LABELS[section.type]}
            onConfirmActions={[deleteSection]}
          />
        </div>
      </div>

      {/* Items container */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              Elementos asociados
            </h3>
            <p className="text-xs text-gray-500">
              Total: {section.items.length}
            </p>
          </div>

          <Button
            className="
              transition-all
              duration-200
              hover:bg-neutral-700
              hover:text-white
              active:scale-[0.98]
              focus-visible:ring-2
              focus-visible:ring-neutral-400
              focus-visible:ring-offset-2
              cursor-pointer
            "
            size="sm"
            onClick={() => setOpen(true)}
          >
            + Agregar elemento
          </Button>
        </div>

        {/* Items list */}
        {section.items?.length ? (
          <div className="flex flex-col gap-3">
            {section.items.map((item: any) => (
              <div
                key={item.id}
                className="
                  rounded-xl
                  border
                  p-4
                  text-sm
                  transition-all
                  hover:shadow-sm
                "
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-600 uppercase">
                    {ITEM_TYPE_LABELS[item.itemType]}
                  </span>
                  <span className="text-xs text-gray-400">
                    Posición {item.position}
                  </span>
                </div>

                {item.itemType === "IMAGE" && (
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-gray-500">Imagen</span>
                    <img
                      src={item.imageUrl}
                      alt={item.title ?? "imagen"}
                      className="rounded-md max-w-full"
                    />
                  </div>
                )}

                {item.itemType === "PRODUCT" && (
                  <div className="text-xs text-gray-600">Producto asociado</div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div
            className="
            border border-dashed rounded-xl p-8
            text-center text-sm text-gray-500
          "
          >
            No hay elementos asociados en esta sección
          </div>
        )}
      </div>

      {/* Dialog */}
      <AddSectionItemDialog
        open={open}
        onOpenChange={setOpen}
        section={section}
        closeDialog={() => setOpen(false)}
      />
    </section>
  );
};
