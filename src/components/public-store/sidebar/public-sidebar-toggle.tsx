"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Menu, X } from "lucide-react";
import { XIcon } from "lucide-react";
import { useState } from "react";

interface CustomSidebarTriggerProps {
  className?: string;
}

export const CustomSidebarTrigger = ({
  className,
}: CustomSidebarTriggerProps) => {
  const { toggleSidebar } = useSidebar();
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => {
        toggleSidebar();
        setOpen((prev) => !prev);
      }}
      className={`p-2 rounded-md hover:bg-neutral-200 cursor-pointer transition-all ${className}`}
      aria-label="Abrir/Colapsar sidebar"
    >
      {open ? <X size={24} className="text-red-900" /> : <Menu size={24} /> }
    </button>
  );
};
