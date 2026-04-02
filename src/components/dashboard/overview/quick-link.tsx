import Link from "next/link";

export const QuickLink = ({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="p-4 border rounded-lg hover:bg-muted transition flex items-center justify-between"
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
      <span className="text-xs opacity-50">→</span>
    </Link>
  );
};
