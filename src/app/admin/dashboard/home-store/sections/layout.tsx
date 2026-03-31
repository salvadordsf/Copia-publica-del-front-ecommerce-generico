import UiDivider from "@/components/dashboard/divider/divider";

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <UiDivider />
      {children}
    </div>
  );
}
