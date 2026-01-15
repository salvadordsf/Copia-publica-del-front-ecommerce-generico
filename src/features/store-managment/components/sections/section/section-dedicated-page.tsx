"use client";

import {
  useSectionById,
  useSections,
} from "@/features/store-managment/services/sections/sections-query";
import { useParams } from "next/navigation";
import { SectionInfo } from "./section-info";

export const SectionPage = () => {
  //Fetch the sections created for take the length
  const {
    data: { data: sections } = {},
    isLoading: isLoadingSections,
    error: errorSections,
  } = useSections({});

  //Fetch the section info by param id
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const {
    data: { data: section } = {},
    isLoading,
    error,
  } = useSectionById(id as string);

  if (isLoading) return <p>Cargando sección</p>;
  if (error || !section) return <p>Error al cargar sección</p>;
  if (isLoadingSections) return <p>Cargando secciones</p>;
  if (errorSections || !sections) return <p>Error al cargar secciones</p>;

  return <SectionInfo section={section} sectionsLength={sections.length} />;
};
