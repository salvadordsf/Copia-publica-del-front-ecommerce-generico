import AdminLayout from "@/components/dashboard/admin-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel",
};

export default function AdminProvidersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
