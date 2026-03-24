"use client";

import { useRequireRole } from "@/hooks/use-require-auth";
import { Spinner } from "../ui/spinner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, havePermission } = useRequireRole(["EDITOR", "ADMIN"]);

  if (loading) return <Spinner />;
  if (!havePermission) return <Spinner />;

  return <>{children}</>;
}
