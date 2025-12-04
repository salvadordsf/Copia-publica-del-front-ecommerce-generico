"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

interface CustomSidebarTriggerProps {
  className?: string;
}

export const CustomSidebarTrigger = ({
  className,
}: CustomSidebarTriggerProps) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className={`p-2 rounded-md hover:bg-neutral-200 ${className}`}
      aria-label="Abrir/Colapsar sidebar"
    >
      <Menu size={24} />
    </button>
  );
};
