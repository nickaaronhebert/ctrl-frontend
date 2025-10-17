import type { PharmacyProductVariant } from "@/types/responses/medication";

interface VariantProps {
  drugName: string;
  variant: PharmacyProductVariant;
  onDelete?: (variant: PharmacyProductVariant) => void;
}

const OrgVariantRow = ({ variant }: VariantProps) => {
  return (
    <div className="grid grid-cols-12 items-center py-3 px-4 bg-light-background  border-b border-gray-200 last:border-b-0 gap-4">
      <p className="col-span-12 md:col-span-3 text-sm text-gray-900 font-medium">
        {variant?.productVariant?.name ? variant?.productVariant?.name : "-"}
      </p>
    </div>
  );
};

export default OrgVariantRow;
