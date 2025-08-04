"use client";

import { useSidebarWidth } from "@/hooks/use-sidebar-width";
import { ReactNode } from "react";

export default function SidebarWidthResizer({
  useSidebar,
  children,
}: {
  useSidebar: any;
  children: ReactNode;
}) {
  const { open, isMobile } = useSidebar();
  const { width: sidebarWidth } = useSidebarWidth();

  return (
    <div
      style={
        isMobile
          ? { width: `90%` }
          : open
          ? { width: `calc(95% - ${sidebarWidth}px)` }
          : { width: `95%` }
      }
    >
      {children}
    </div>
  );
}
