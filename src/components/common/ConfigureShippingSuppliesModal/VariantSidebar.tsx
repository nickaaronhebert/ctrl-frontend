import { useMedication } from "@/context/ApplicationUser/MedicationContext";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface VariantsSidebarProps {
  selectedVariantsIds: string[];
  onSelectionChange: (ids: string[]) => void;
}

export default function VariantsSidebar({
  selectedVariantsIds,
  onSelectionChange,
}: VariantsSidebarProps) {
  const { selectedVariants } = useMedication();

  const total = selectedVariants?.length;
  const selectedCount = selectedVariantsIds?.length;
  const progress = total === 0 ? 0 : (selectedCount / total) * 100;
  const allSelected = selectedCount === total && total > 0;

  const toggleVariant = (id: string) => {
    onSelectionChange(
      selectedVariantsIds.includes(id)
        ? selectedVariantsIds.filter((v) => v !== id)
        : [...selectedVariantsIds, id]
    );
  };

  const toggleSelectAll = () => {
    onSelectionChange(
      selectedVariantsIds?.length === total
        ? []
        : selectedVariants?.map((v) => v.variantId)
    );
  };

  //   console.log("Selected Variant Id: ", s);

  return (
    <div className="flex flex-col h-full bg-[#F6F8F9] ">
      <div className="p-[20px] bg-[#ffffff] border border-[#DFDFDFE0] space-y-2 ">
        <div className="flex items-center justify-between text-sm font-medium">
          <span>Variants</span>
          <span className="text-muted-foreground">
            {selectedCount} of {total} done
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      <Button
        type="button"
        variant={"link"}
        onClick={toggleSelectAll}
        className="px-4 py-3 text-sm text-primary hover:underline text-left self-end"
      >
        {allSelected ? "Unselect All Variants" : "Select All Variants"}
      </Button>
      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-3">
        {selectedVariants?.map((item) => {
          const checked = selectedVariantsIds?.includes(item.variantId);

          return (
            <Label
              key={item.variantId}
              className={cn(
                "flex items-start gap-3 p-[15px] cursor-pointer transition bg-[#ffffff] border border-slate-300 rounded-[10px]",
                checked
                  ? "border-primary bg-primary/5"
                  : "hover:border-muted-foreground/40"
              )}
            >
              <div className="pt-1">
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => toggleVariant(item.variantId)}
                />
              </div>

              <div className="flex flex-col">
                <span className="font-medium text-sm">{item.variant.name}</span>
                <span className="text-xs text-muted-foreground">
                  Not Configured
                </span>
              </div>
            </Label>
          );
        })}
      </div>
    </div>
  );
}
