"use client";

import { HomeSection } from "@/types/resources/home-section-types";
import { useSections } from "../../services/sections/sections-query";
import { AddSection } from "../sections/cards/add-section";
import { SectionCard } from "../sections/cards/section-card";
import { StoreViewerContainer } from "./store-viewer-conteiner";

export const StoreEditor = () => {
  const { data, isLoading, error } = useSections({});
  const sections = data?.success ? data.data : [];

  if (isLoading) return <p>Cargando secciones...</p>;
  if (error) return <p>Error al cargar secciones</p>;

  return (
    <StoreViewerContainer>
      <>
        {sections.length > 0 ? (
          sections.map((section: HomeSection) => (
            <SectionCard section={section} key={section.id} />
          ))
        ) : (
          <div className="text-center">Aún no hay secciones creadas</div>
        )}
        <AddSection />
      </>
    </StoreViewerContainer>
  );
};
