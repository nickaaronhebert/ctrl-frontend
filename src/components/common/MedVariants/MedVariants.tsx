import Pharmacies from "@/assets/icons/Pharmacies";
import type { MedicationVariant } from "@/components/data-table/columns/medication-library";

interface MedVariantsProps {
  variants?: MedicationVariant[];
}

export default function MedVariants({ variants }: MedVariantsProps) {
  console.log("variant", variants);
  return (
    <div id="medVariants" className="bg-white rounded-[15px]">
      {/* Header */}
      <div className="flex items-center gap-2 p-3 mb-1">
        <Pharmacies color="black" />
        <h1 className="font-semibold text-[16px] leading-[22px] text-black">
          Variants
        </h1>
        {/* </div> */}
      </div>
      <hr className="border-t-1 border-card-border" />
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {variants?.map((variant: MedicationVariant) => (
            <div
              key={variant?.id}
              className="bg-white rounded-[10px] border border-card-border"
            >
              <div className="p-4 bg-slate-50 rounded-[10px]">
                <h2 className="font-normal text-[14px] leading-[18px] text-black">
                  <span className="text-black font-bold">Variant - </span>
                  <span className="text-gray-800">{variant.strength}</span>
                </h2>
              </div>
              <hr className=" border-t-1 border-card-border" />
              <div className="p-6">
                <div className="mb-4">
                  <label className="font-normal text-[14px] leading-[18px] text-muted-foreground mb-1">
                    Strength
                  </label>
                  <p className="font-medium text-[14px] leading-[18px] text-black">
                    {variant.strength}
                  </p>
                </div>
                <div className="mb-4">
                  <label className="font-normal text-[14px] leading-[18px] text-muted-foreground mb-1">
                    Container Qty
                  </label>
                  <p className="font-medium text-[14px] leading-[18px] text-black">
                    {variant.containerQuantity}
                  </p>
                </div>
                <div>
                  <label className="font-normal text-[14px] leading-[18px] text-muted-foreground mb-2">
                    Container Qty Type
                  </label>
                  <div className="relative">
                    <span className="inline-flex items-center rounded-[6px] py-[3px] bg-background px-[8px]  text-sm font-medium border border-primary text-primary  ">
                      {variant.quantityType}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
