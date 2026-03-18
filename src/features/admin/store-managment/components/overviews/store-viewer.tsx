"use client";

import { useSections } from "../../services/sections/sections-query";
import { SectionCard } from "../sections/cards/section-card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { StoreViewerContainer } from "./store-viewer-conteiner";

export const StoreViewer = () => {
  const router = useRouter();
  const { data: data = {}, isLoading, error } = useSections({ isEnabled: true });

  if (isLoading) return <p>Cargando secciones activas...</p>;
  if (error) return <p>Error al cargar secciones activas</p>;

  return (
    <StoreViewerContainer>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-gray-800">
            Vista del Home
          </h2>
          <p className="text-xs text-gray-500">
            Orden y contenido de las secciones visibles (activas)
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/admin/dashboard/home-store/sections")}
          className="cursor-pointer"
        >
          Editar secciones
        </Button>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4">
        {data.data.length > 0 ? (
          data.data.map((section: any) => (
            <SectionCard
              section={section}
              key={section.key}
              isEditable={false}
            />
          ))
        ) : (
          <div className="text-center text-sm text-gray-500 py-8">
            Aún no hay secciones activas
          </div>
        )}
      </div>
    </StoreViewerContainer>
  );
};
