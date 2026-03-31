import UiSidebar from "@/components/dashboard/sidebar/sidebar";
import UiSidebarSkeleton from "@/components/dashboard/sidebar/sidebar-skeleton";
import { CustomSidebarTrigger } from "@/components/public-store/sidebar/public-sidebar-toggle";
import SidebarWidthResizer from "@/components/sidebar-width/sidebar-width-resizer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Suspense } from "react";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-hidden">
        
        {/* Sidebar */}
        <Suspense fallback={<UiSidebarSkeleton length={5} />}>
          <UiSidebar title="Panel de administrador" />
        </Suspense>

        {/* Contenido + trigger */}
        <div className="flex-1 flex flex-col">
          {/* Custom trigger */}
          <div className="flex p-2">
            <CustomSidebarTrigger />
            <h1 className="text-2xl p-2">Panel de administrador</h1>
          </div>

          {/* main content with resizer */}
          <SidebarWidthResizer>
            <div className="pl-5">
              {children}
            </div>
          </SidebarWidthResizer>
        </div>
      </div>
    </SidebarProvider>
  );
}
