import { Card, CardContent } from "@/components/ui/card";

export const KpiCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) => {
  return (
    <Card>
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-xl font-bold">{value}</h3>
        </div>
        <div className="opacity-70">{icon}</div>
      </CardContent>
    </Card>
  );
};
