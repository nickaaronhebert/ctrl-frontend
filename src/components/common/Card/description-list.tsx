import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type DescriptionItem = {
  label: string;
  value: ReactNode;
  emphasize?: boolean;
};

export function DescriptionList({
  title,
  items,
  className,
}: {
  title?: string;
  items: DescriptionItem[];
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl bg-card p-5 md:p-6 shadow-sm ", className)}>
      {title ? (
        <h3 className="font-medium text-[16px] leading-[18px] text-[#081F3B] mb-4">
          {title}
        </h3>
      ) : null}
      <dl className="grid grid-cols-2 gap-y-3">
        {items.map((it, idx) => (
          <div className="contents" key={idx}>
            <dt className="font-normal text-[15px] leading-[16px] text-[#3E4D61]">
              {it.label}
            </dt>
            <dd
              className={cn(
                "text-sm text-foreground text-right",
                it.emphasize && "font-semibold"
              )}
            >
              {it.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
