"use client";

import { useSectionById } from "@/features/store-managment/services/sections/sections-query";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddSectionItemDialog } from "../../items/add-item-dialog";

export const SectionInfo = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [open, setOpen] = useState(false);

  if (!id) return <p>ID inválido</p>;

  const { data: { data: section } = {}, isLoading, error } = useSectionById(id);

  if (isLoading) return <p>Cargando sección</p>;
  if (error || !section) return <p>Error al cargar sección</p>;

  return (
    <section className="flex flex-col gap-6">
      {/* INFO */}
      <div>
        <h3>Tipo: {section.type}</h3>
        <h3>Posición: {section.position}</h3>
      </div>

      {/* ITEMS */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3>Items {section.items.length}</h3>
          <Button onClick={() => setOpen(true)}>➕ Agregar item</Button>
        </div>

        {section.items?.length ? (
          section.items.map((item: any) => (
            <div key={item.id} className="border rounded p-3 text-sm">
              <div>
                <strong>Tipo:</strong> {item.itemType}
              </div>
              <strong>Posición:</strong> {item.position}
              {item.itemType === "IMAGE" && (
                <div>
                  <strong>Imagen:</strong>{" "}
                  <img src={item.imageUrl} alt={item.title ?? "imagen"} />
                </div>
              )}
              {item.itemType === "PRODUCT" && (
                <div>
                  <strong>Nombre del producto:</strong> {item.position}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="border border-dashed rounded p-6 text-center text-sm text-neutral-500">
            No hay items en esta sección
          </div>
        )}
      </div>

      {/* DIALOG */}
      <AddSectionItemDialog
        open={open}
        onOpenChange={setOpen}
        section={section}
        closeDialog={() => setOpen(false)}
      />
    </section>
  );
};
