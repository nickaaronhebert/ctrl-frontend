import { type ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  icon: ReactNode;
  value: string | number;
  description?: string;
  descriptionIcon?: ReactNode;
}

export const StatCard = ({
  title,
  icon,
  value,
  description,
  descriptionIcon,
}: StatCardProps) => {
  return (
    <Card className="border border-none outline-none shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">
            {descriptionIcon && (
              <span className="inline-block mr-1">{descriptionIcon}</span>
            )}
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
