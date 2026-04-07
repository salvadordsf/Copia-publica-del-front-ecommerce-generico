import AdminLayout from "@/components/dashboard/admin-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s | Admin",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminProvidersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
