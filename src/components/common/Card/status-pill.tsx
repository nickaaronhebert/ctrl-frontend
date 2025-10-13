import type React from "react";
import { Check, Clock, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "success" | "warning" | "neutral";

const toneStyles: Record<
  Tone,
  { text: string; bg: string; border: string; icon: React.ReactNode }
> = {
  success: {
    // use theme tokens and chart colors for subtle backgrounds
    text: "text-[color:var(--color-chart-2)]",
    bg: "bg-[color:var(--color-chart-2)]/10",
    border: "border-[color:var(--color-chart-2)]/20",
    icon: <Check className="h-3.5 w-3.5" />,
  },
  warning: {
    text: "text-[color:var(--color-chart-5)]",
    bg: "bg-[color:var(--color-chart-5)]/10",
    border: "border-[color:var(--color-chart-5)]/20",
    icon: <Clock className="h-3.5 w-3.5" />,
  },
  neutral: {
    text: "text-foreground",
    bg: "bg-muted",
    border: "border-border",
    icon: <Circle className="h-3.5 w-3.5" />,
  },
};

export function StatusPill({
  label,
  tone = "neutral",
  icon,
  className,
}: {
  label: string;
  tone?: Tone;
  icon?: React.ReactNode;
  className?: string;
}) {
  const t = toneStyles[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-xs font-medium",
        t.text,
        t.bg,
        t.border,
        className
      )}
      aria-label={label}
    >
      <span className="sr-only">{"Status:"}</span>
      <span className="inline-flex items-center ">{icon ?? t.icon}</span>
      <span className="uppercase">{label}</span>
    </span>
  );
}
