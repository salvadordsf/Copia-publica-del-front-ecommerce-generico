import MainFooter from "@/components/public-store/footer/public-footer";
import { MainHeader } from "@/components/public-store/main-header/main-header";
import PublicSidebar from "@/components/public-store/sidebar/public-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <PublicSidebar />
      <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
        <MainHeader />
        <main className="flex-1 w-full overflow-x-hidden">{children}</main>
        <MainFooter />
      </div>
    </SidebarProvider>
  );
}
