import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TwoColumnLayout from "./layout/TwoColumnLayout";
import VariantsSidebar from "./VariantSidebar";
import { ShippingConfiguration } from "./ShippingConfiguration";
import { useMemo, useState } from "react";
import { useMedication } from "@/context/ApplicationUser/MedicationContext";

interface CatalogueVariantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ConfigureShippingSuppliesModal({
  open,
  onOpenChange,
}: CatalogueVariantDialogProps) {
  const { selectedVariants } = useMedication();
  const [selectedVariantsIds, setSelectedVariantsIds] = useState<string[]>([]);

  const selectedVariant = useMemo(
    () =>
      selectedVariants?.filter((v) =>
        selectedVariantsIds.includes(v.variantId)
      ),
    [selectedVariants, selectedVariantsIds]
  );

  //   const navigate = useNavigate();
  //   const form = useForm<CatalogueVariantFormValues>({
  //     resolver: zodResolver(catalogueVariantSchema),
  //     defaultValues: {
  //       name: "",
  //       description: "",
  //     },
  //   });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto gap-0">
        <DialogHeader className="flex flex-col gap-2 ">
          <DialogTitle className="text-xl font-semibold p-3 text-gray-900 border border-b-gray-300 border-t-0 border-l-0 border-r-0">
            Configure Shipping and Supplies
          </DialogTitle>
        </DialogHeader>
        <div className="h-[calc(90vh-64px)]">
          <TwoColumnLayout
            sidebar={
              <VariantsSidebar
                selectedVariantsIds={selectedVariantsIds}
                onSelectionChange={setSelectedVariantsIds}
              />
            }
            content={
              <ShippingConfiguration selectedVariant={selectedVariant} />
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
