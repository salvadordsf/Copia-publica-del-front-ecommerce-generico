import UiBreadcrumb from "@/components/dashboard/breadcrumb/breadcrumb";
import UiDivider from "@/components/dashboard/divider/divider";
import { Folder } from 'lucide-react';

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <header className="">
        <UiBreadcrumb
          items={[
            { href: "/admin/dashboard", label: "Inicio administrador" },
            { href: "/admin/dashboard/bulk/categories", label: "Acciones en lote" },
            { href: "/admin/dashboard/bulk/categories", label: "Categorías - Acciones en lote" },
          ]}
        />
        <h1 className="flex items-center gap-2 text-3xl m-2">
          <Folder />
          Categorías - Acciones en lote
        </h1>
      </header>
      <UiDivider />
      {children}
    </div>
  );
}
