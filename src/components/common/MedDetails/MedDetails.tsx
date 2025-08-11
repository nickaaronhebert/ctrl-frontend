import type React from "react";
import { type MedicationVariant } from "@/components/data-table/columns/medication-library";
import MedicationLibrary from "@/assets/icons/MedicationLibrary";

interface MedDetailsProps {
  drugName: string;
  compound: string;
  category: string;
  variants: MedicationVariant[];
  form: string;
  instructions: string;
  administrationNotes: string;
}

const CustomBadge = ({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "default" | "purple" | "blue";
  className?: string;
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    purple: "bg-secondary  text-category-secondary",
    blue: "bg-blue-500 text-white",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

const InfoRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="space-y-1">
      <div className="font-normal text-[14px] leading-[18px] text-muted-foreground">
        {label}
      </div>
      <div className="font-medium text-[14px] leading-[18px] text-primary-foreground">
        {children}
      </div>
    </div>
  );
};

export default function MedDetails({
  drugName,
  compound,
  category,
  variants,
  form,
  instructions,
  administrationNotes,
}: MedDetailsProps) {
  return (
    <div id="medicationDetails" className="bg-white rounded-[15px] ">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1 p-3">
        {/* <ZigZag color="black" /> */}
        <MedicationLibrary color="black" />
        <h2 className="font-semibold text-[16px] leading-[22px] text-black">
          Medication Details
        </h2>
      </div>
      <hr className="mt-1 border-t-1 border-card-border" />
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <InfoRow label="Medication Name">
            <span className="font-medium">{drugName}</span>
          </InfoRow>
          <InfoRow label="Compound">
            <div className="flex items-center gap-2">
              <span className="font-medium">{compound}</span>
            </div>
          </InfoRow>
          <InfoRow label="Category">
            <CustomBadge variant="purple">{category}</CustomBadge>
          </InfoRow>
        </div>
        <div className="flex mb-6 gap-10 items-center">
          <InfoRow label="Strength">
            <div className="flex gap-2">
              {variants?.map((variant) => {
                return (
                  <span className="bg-slate-100 font-semibold text-[12px] leading-[16px] text-black rounded-[5px] py-[4px] px-[8px]">
                    {variant?.strength}
                  </span>
                );
              })}
            </div>
          </InfoRow>
          <InfoRow label="Form">
            <span className="font-medium text-[14px] leading-[18px] ">
              {form}
            </span>
          </InfoRow>
        </div>
        <div className="mb-6">
          <InfoRow label="Clinical Instructions">
            <p className="font-medium text-[14px] leading-[18px] text-primary-foreground">
              {instructions}
            </p>
          </InfoRow>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-600">Administration Notes</span>
          </div>
          <div className="bg-pending-secondary rounded-[5px] px-[15px] py-[10px]">
            <p className="text-pending text-[14px] font-medium leading-[18px] ">
              {administrationNotes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
