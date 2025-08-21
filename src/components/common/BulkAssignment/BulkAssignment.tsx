import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { pharmacies } from "@/constants";

type BulkAssignmentProps = {
  selectedPharmacy: string | null;
  setSelectedPharmacy: (id: string) => void;
};

export function BulkAssignment({
  selectedPharmacy,
  setSelectedPharmacy,
}: BulkAssignmentProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            Bulk Assignment
          </h2>
        </div>
        <p className="text-sm text-gray-600 ml-6">
          Apply one pharmacy to multiple states
        </p>
      </div>

      {/* Select and Button Row */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1">
          <Select
            value={selectedPharmacy || ""}
            onValueChange={setSelectedPharmacy}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Pharmacy" />
            </SelectTrigger>
            <SelectContent>
              {pharmacies.map((pharmacy) => (
                <SelectItem key={pharmacy.id} value={pharmacy.id}>
                  {pharmacy.name}, {pharmacy.number}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          disabled={!selectedPharmacy}
          className="bg-primary text-white px-6"
        >
          Apply to All
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-6 bg-light-background p-3">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-[12px] leading-[16px] text-[#1aa263]">
              18 states available
            </p>
            <p className="font-normal text-[12px] leading-[16px] text-[#1aa263]">
              Will be assigned automatically
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-[12px] leading-[16px] text-[#d56f01]">
              32 states unavailable
            </p>
            <p className="font-normal text-[12px] leading-[16px] text-[#d56f01] ">
              Require manual assignment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
