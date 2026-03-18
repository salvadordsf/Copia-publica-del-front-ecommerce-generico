"use client";

import { useRouter } from "next/navigation";
import { SECTIONS_TYPE_LABELS } from "@/features/admin/store-managment/utils/sections-translations";
import ConfirmDeleteDialog from "@/components/dashboard/actions/delete/action-delete-dialog";
import { useDeleteSection } from "@/features/admin/store-managment/services/sections/sections-mutations";
import { toast } from "sonner";
import { HomeSection } from "@/types/resources/home-section-types";

export const DeleteSectionDialog = ({ section }: { section: HomeSection }) => {
  const router = useRouter();

  //Delete logic
  const { mutate } = useDeleteSection();
  const deleteSection = () => {
    mutate(section.id, {
      onSuccess: () => {
        toast.success(
          `La sección ${SECTIONS_TYPE_LABELS[section.type]} ${
            section.title ? "- ".concat(section.title) : ""
          } se eliminó correctamente`
        );
        router.push("/admin/dashboard/home-store/sections");
      },
      onError: () => {
        toast.error("Error al intentar eliminar sección");
      },
    });
  };

  return (
    <ConfirmDeleteDialog
      resourceStatus="ACTIVE"
      resourceType="sección"
      resourceName={SECTIONS_TYPE_LABELS[section.type]}
      onConfirmActions={[deleteSection]}
    />
  );
};
