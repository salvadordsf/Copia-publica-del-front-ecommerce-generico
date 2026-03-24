import UiBreadcrumb from "@/components/dashboard/breadcrumb/breadcrumb";
import UiDivider from "@/components/dashboard/divider/divider";
import { UsersRound } from 'lucide-react';

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
            { href: "/admin/dashboard/users", label: "Gestionar Usuarios" },
          ]}
        />
        <h1 className="flex items-center gap-2 text-3xl m-2">
          <UsersRound />
          Usuarios
        </h1>
      </header>
      <UiDivider />
      {children}
    </div>
  );
}
