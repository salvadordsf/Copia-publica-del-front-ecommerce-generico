"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddSectionItemDialog } from "../../items/add-item-dialog";
import { SECTIONS_TYPE_LABELS } from "@/features/admin/store-managment/utils/sections-translations";
import UpdateSectionDialog from "./update/section-update-dialog";
import { DeleteSectionDialog } from "./delete/section-delete-dialog";
import { HomeSection } from "@/types/resources/home-section-types";
import { ItemList } from "../../items/item-list";

export const SectionInfo = ({
  section,
  sectionsLength,
}: {
  section: HomeSection;
  sectionsLength: number;
}) => {
  //State for add section item dialog
  const [open, setOpen] = useState(false);

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
          <UpdateSectionDialog
            section={section}
            sectionsLength={sectionsLength}
          />

          <DeleteSectionDialog section={section} />
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
        <ItemList section={section} />
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
