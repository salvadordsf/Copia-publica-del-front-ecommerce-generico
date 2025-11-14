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
      <header className="pt-10">
        <UiBreadcrumb
          items={[
            { href: "/admin/dashboard", label: "Inicio administrador" },
            { href: "/admin/dashboard/bulk/tags", label: "Acciones en lote" },
            { href: "/admin/dashboard/bulk/tags", label: "Etiquetas - Acciones en lote" },
          ]}
        />
        <h1 className="flex items-center gap-2 text-3xl m-2">
          <Folder />
          Etiquetas - Acciones en lote
        </h1>
      </header>
      <UiDivider />
      {children}
    </div>
  );
}
