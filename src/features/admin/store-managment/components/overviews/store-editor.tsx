"use client";

import { useSections } from "../../services/sections/sections-query";
import { AddSection } from "../sections/cards/add-section";
import { SectionCard } from "../sections/cards/section-card";
import { StoreViewerContainer } from "./store-viewer-conteiner";

interface IStoreEditorProps {}

export const StoreEditor = ({}: IStoreEditorProps) => {
  const { data: data = {}, isLoading, error } = useSections({});

  if (isLoading) return <p>Cargando secciones...</p>;
  if (error) return <p>Error al cargar secciones</p>;

  return (
    <StoreViewerContainer>
      <>
        {data.data.length > 0 ? (
          data.data.map((section: any) => (
            <SectionCard section={section} key={section.key} />
          ))
        ) : (
          <div className="text-center">Aún no hay secciones creadas</div>
        )}
        <AddSection />
      </>
    </StoreViewerContainer>
  );
};
