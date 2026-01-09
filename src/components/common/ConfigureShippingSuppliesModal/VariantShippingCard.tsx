// import type { CatalogueVariantItem } from "./types";

import MedicationLibrary from "@/assets/icons/MedicationLibrary";

interface VariantShippingCardProps {
  variant: any;
}

export function VariantShippingCard({ variant }: VariantShippingCardProps) {
  return (
    <div className="rounded-xl bg-white">
      <div className="flex gap-2 items-center px-[30px] py-[16px] bg-[#F7F1FD] border border-[#F7F1FD] ">
        <div className="w-[50px] h-[50px] flex justify-center items-center bg-lilac rounded-[8px]">
          <MedicationLibrary />
        </div>
        <div>
          <p className="font-semibold text-primary">{variant.variant.name}</p>
          <span className="text-sm text-muted-foreground">
            Configure shipping and supplies for this variant
          </span>
        </div>
      </div>
    </div>
  );
}
