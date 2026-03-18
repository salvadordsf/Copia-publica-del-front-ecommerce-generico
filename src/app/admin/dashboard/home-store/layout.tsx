import UiBreadcrumb from "@/components/dashboard/breadcrumb/breadcrumb";
import UiDivider from "@/components/dashboard/divider/divider";
import { Store } from 'lucide-react';

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <header className="pt-10">
        <UiBreadcrumb
          items={[
            { href: "/admin/dashboard", label: "Inicio administrador" },
            { href: "/admin/dashboard/home-store", label: "Gestionar tienda" },
          ]}
        />
        <h1 className="flex items-center gap-2 text-3xl m-2">
          <Store />
          Gestor de tienda
        </h1>
      </header>
      <UiDivider />
      {children}
    </div>
  );
}
