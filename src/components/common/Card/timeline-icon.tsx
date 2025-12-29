import {
  Package,
  CheckCircle2,
  ClipboardCheck,
  Truck,
  Box,
} from "lucide-react";

interface TimelineIconProps {
  icon: string;
}

export function TimelineIcon({ icon }: TimelineIconProps) {
  const iconMap: Record<string, React.ReactNode> = {
    transmitted: (
      <Package className="w-8 h-8 text-blue-600 bg-blue-50 rounded-full p-1.5" />
    ),
    processed: (
      <ClipboardCheck className="w-8 h-8 text-purple-600 bg-purple-50 rounded-full p-1.5" />
    ),
    ready: (
      <Box className="w-8 h-8 text-orange-600 bg-orange-50 rounded-full p-1.5" />
    ),
    shipped: (
      <Truck className="w-8 h-8 text-blue-600 bg-blue-50 rounded-full p-1.5" />
    ),
    delivered: (
      <CheckCircle2 className="w-8 h-8 text-green-600 bg-green-50 rounded-full p-1.5" />
    ),
  };

  return <div>{iconMap[icon] || iconMap.transmitted}</div>;
}
