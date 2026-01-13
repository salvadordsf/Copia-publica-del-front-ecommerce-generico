"use client";

import { useSections } from "../../services/sections/sections-query";
import { AddSection } from "../sections/cards/add-section";
import { SectionCard } from "../sections/cards/section-card";

interface IStoreEditorProps {}

export const StoreEditor = ({}: IStoreEditorProps) => {
  const { data: data = {}, isLoading, error } = useSections({});

  if (isLoading) return <p>Cargando secciones...</p>;
  if (error) return <p>Error al cargar secciones</p>;

  return (
    <div className="flex flex-col gap-3 w-xl p-2 border-1 border-black">
      {data.data.length > 0 ? (
        data.data.map((section: any) => (
          <SectionCard section={section} key={section.key} />
        ))
      ) : (
        <div className="text-center">Aún no hay secciones creadas</div>
      )}
      <AddSection />
    </div>
  );
};
