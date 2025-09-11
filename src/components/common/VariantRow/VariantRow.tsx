import type { PharmacyProductVariant } from "@/types/responses/medication";

interface VariantProps {
  drugName: string;
  variant: PharmacyProductVariant;
}

const VariantRow = ({ variant, drugName }: VariantProps) => {
  console.log("Variant", variant);
  console.log("drugName", drugName);
  return (
    <div className="flex justify-between items-center py-3 px-4 bg-light-background border-b border-gray-200 last:border-b-0">
      <p className="text-sm text-gray-900 font-medium">
        {drugName} {variant?.productVariant?.strength}
      </p>
      <p className="text-sm text-gray-900 font-semibold">
        ${variant?.price?.toFixed(2)}
      </p>
    </div>
  );
};

export default VariantRow;
