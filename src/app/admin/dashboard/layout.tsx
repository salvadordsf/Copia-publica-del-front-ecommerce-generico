import UiSidebar from "@/components/dashboard/sidebar/sidebar";
import UiSidebarSkeleton from "@/components/dashboard/sidebar/sidebar-skeleton";
import SidebarWidthResizer from "@/components/sidebar-width/sidebar-width-resizer";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Suspense } from "react";

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Suspense fallback={<UiSidebarSkeleton length={5} />}>
        <UiSidebar title="Panel de administrador" />
        <>
          <SidebarTrigger />
          <SidebarWidthResizer useSidebar={useSidebar}>{children}</SidebarWidthResizer>
        </>
      </Suspense>
    </SidebarProvider>
  );
}
