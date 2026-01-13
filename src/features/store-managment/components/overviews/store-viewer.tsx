"use client";

import { useSections } from "../../services/sections/sections-query";
import { SectionCard } from "../sections/cards/section-card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { StoreViewerContainer } from "./store-viewer-conteiner";

interface IStoreViewerProps {}

export const StoreViewer = ({}: IStoreViewerProps) => {
  const router = useRouter();
  const { data: data = {}, isLoading, error } = useSections({});

  if (isLoading) return <p>Cargando secciones...</p>;
  if (error) return <p>Error al cargar secciones</p>;

  return (
    <div>
      <Button
        onClick={() => router.push("/admin/dashboard/home-store/sections")}
        className="hover:bg-neutral-900 cursor-pointer mb-2"
      >
        Editar secciones
      </Button>
      <StoreViewerContainer>
        {data.data.length > 0 ? (
          data.data.map((section: any) => (
            <SectionCard section={section} key={section.key} />
          ))
        ) : (
          <div className="text-center">Aún no hay secciones creadas</div>
        )}
      </StoreViewerContainer>
    </div>
  );
};
