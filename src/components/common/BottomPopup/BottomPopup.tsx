"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useMedication } from "@/context/ApplicationUser/MedicationContext";

interface BottomPopupProps {
  onCreateCatalogue: () => void;
}

export default function BottomPopup({ onCreateCatalogue }: BottomPopupProps) {
  const { selectedVariants } = useMedication();

  const selectedCount = selectedVariants.length;
  const medicationCount = new Set(selectedVariants.map((v) => v.medicationId))
    .size;

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg px-6 py-4 flex items-center gap-4 min-w-[400px]">
        <div className="flex-1">
          <div className="font-medium text-gray-900">
            Ready to create catalogue
          </div>
          <div className="text-sm text-gray-500">
            {selectedCount} variants from {medicationCount} medications
          </div>
        </div>
        <Button
          onClick={onCreateCatalogue}
          className="bg-primary hover:bg-primary cursor-pointer text-white px-6 py-2 rounded-lg flex items-center gap-2"
        >
          Create Catalogue
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
