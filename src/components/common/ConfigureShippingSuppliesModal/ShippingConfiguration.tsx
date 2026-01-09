import { VariantShippingCard } from "./VariantShippingCard";

interface ShippingConfigurationProps {
  selectedVariant: any[];
}

export function ShippingConfiguration({
  selectedVariant,
}: ShippingConfigurationProps) {
  if (selectedVariant?.length === 0) {
    return (
      <div className="p-6 text-muted-foreground">
        Select one or more variants to configure shipping and supplies
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {selectedVariant?.map((item) => (
        <VariantShippingCard key={item.variantId} variant={item} />
      ))}
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Shipping Class</label>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Supplies</label>
        </div>
      </div>
    </div>
  );
}
