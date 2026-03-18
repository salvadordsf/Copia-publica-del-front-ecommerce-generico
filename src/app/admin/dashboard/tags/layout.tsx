import UiBreadcrumb from "@/components/dashboard/breadcrumb/breadcrumb";
import UiDivider from "@/components/dashboard/divider/divider";
import { Tag } from "lucide-react";

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-[90%] sm:w-full">
      <header className="pt-10">
        <UiBreadcrumb
          items={[
            { href: "/admin/dashboard", label: "Inicio administrador" },
            { href: "/admin/dashboard/tags", label: "Gestionar Tags" },
          ]}
        />
        <h1 className="flex items-center gap-2 text-3xl m-2">
          <Tag />
          Etiquetas
        </h1>
      </header>
      <UiDivider />
      {children}
    </div>
  );
}
