"use client";

import { ReactNode } from "react";
import { useSidebar } from "../ui/sidebar";

export default function SidebarWidthResizer({
  children,
}: {
  children: ReactNode;
}) {
  const { open, isMobile } = useSidebar();

  return (
    <div
      style={
        isMobile
          ? { width: `90%` }
          : open
          ? { width: `calc(90%` }
          : { width: `95%` }
      }
    >
      {children}
    </div>
  );
}
