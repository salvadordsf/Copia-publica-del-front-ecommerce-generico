"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Menu, X } from "lucide-react";

interface CustomSidebarTriggerProps {
  className?: string;
}

export const CustomSidebarTrigger = ({
  className,
}: CustomSidebarTriggerProps) => {
  const { toggleSidebar, open, openMobile, isMobile } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className={`p-2 rounded-md hover:bg-neutral-200 cursor-pointer transition-all ${className}`}
      aria-label="Abrir/Colapsar sidebar"
    >
      {isMobile ? (
        openMobile ? (
          <X size={24} className="text-red-900" />
        ) : (
          <Menu size={24} />
        )
      ) : open ? (
        <X size={24} className="text-red-900" />
      ) : (
        <Menu size={24} />
      )}
    </button>
  );
};
