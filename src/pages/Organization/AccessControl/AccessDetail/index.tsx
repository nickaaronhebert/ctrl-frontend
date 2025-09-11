import { MedicationSelection } from "@/components/common/MedicationSelection/MedicationSelection";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { VariantSelection } from "@/components/common/VariantSelection/VariantSelection";
import MedicationLibrary from "@/assets/icons/MedicationLibrary";
import { BulkAssignment } from "@/components/common/BulkAssignment/BulkAssignment";
import DefaultPharmacy from "@/components/common/DefaultPharmacy/DefaultPharmacy";
import { useGetSingleAccessControlQuery } from "@/redux/services/access-control";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useLazyGetAccessControlByProductVariantQuery } from "@/redux/services/access-control";
import ProgressOverview from "@/components/common/ProgressOverview/ProgressOverview";

export type Medication = {
  id: string;
  name: string;
};

export type Variant = {
  containerQuantity?: number;
  id: string;
  quantityType?: string;
  strength: string;
};

const AccessDetail = () => {
  const [selectedMedication, setSelectedMedication] =
    useState<Medication | null>(null);
  const [configuredStates, setConfiguredStates] = useState<
    Record<string, string>
  >({});
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { id } = useParams();
  const { data: singleAccessControl, isLoading } =
    useGetSingleAccessControlQuery(id!, {
      skip: !id,
    });

  console.log("singleAccessControlllll", singleAccessControl);

  const [triggerGetAccessControl, { data: variantAccessControlData }] =
    useLazyGetAccessControlByProductVariantQuery();

  useEffect(() => {
    if (id && singleAccessControl) {
      setSelectedMedication({
        id: singleAccessControl?.data?.productVariant?.medicationCatalogue?.id,
        name: singleAccessControl?.data?.productVariant?.medicationCatalogue
          ?.drugName,
      });
      setSelectedVariant({
        id: singleAccessControl?.data?.productVariant?.id,
        strength: singleAccessControl?.data?.productVariant?.strength,
      });
    }
  }, [id, singleAccessControl]);

  useEffect(() => {
    if (!id && selectedVariant?.id) {
      triggerGetAccessControl(selectedVariant?.id);
    }
  }, [selectedVariant, id, triggerGetAccessControl]);

  const isEditing = Boolean(id && selectedMedication && selectedVariant);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  console.log("selectedMedicationnnn", selectedMedication);
  console.log("selectedVariantttt", selectedVariant);

  return (
    <div className="mb-5">
      <div className="bg-lilac py-3 px-12">
        <Link
          to={"/org/access-control"}
          className="font-normal text-sm text text-muted-foreground"
        >
          {"<- Back to Pharmacy Assignment"}
        </Link>

        <h1 className="text-2xl font-bold mt-1">
          Medication: {selectedMedication?.name}
        </h1>
      </div>
      <div className="flex gap-8 px-14 mt-6">
        <div
          className="min-w-[380px] max-w-[380px] 
            rounded-[10px] shadow-[0px_2px_40px_0px_#00000014] h-fit"
        >
          <div className="p-3">
            <p className="font-medium text-[16px] leading-[22px] text-black">
              Select Medication & Variant
            </p>
            <span className="font-normal text-[12px] leading-[11px] text-slate">
              Choose what you want to configure
            </span>
          </div>
          <div className="h-[2px] bg-gray-200 w-full" />
          {/* Select medication section */}
          <div className="p-3">
            <div className="mb-4">
              <p className="font-medium text-[16px] leading-[22px] mb-1 text-black">
                Medication
              </p>
              <MedicationSelection
                selectedMedication={selectedMedication}
                setSelectedMedication={setSelectedMedication}
                disabled={isEditing}
              />
            </div>
            {selectedMedication && (
              <div className="mt-2">
                <p className="font-medium text-[16px] leading-[22px] text-black mb-1">
                  Variants
                </p>
                <VariantSelection
                  selectedVariant={selectedVariant}
                  setSelectedVariant={setSelectedVariant}
                  selectedMedication={selectedMedication}
                  disabled={isEditing}
                />
              </div>
            )}
          </div>
          <div className="h-[2px] bg-gray-200 w-full" />
          {selectedMedication && selectedVariant && (
            <ProgressOverview configuredStates={configuredStates} />
          )}
        </div>
        {selectedMedication && selectedVariant ? (
          <div className="w-full flex flex-col gap-5">
            <BulkAssignment
              selectedPharmacy={selectedPharmacy}
              setSelectedPharmacy={setSelectedPharmacy}
            />
            <DefaultPharmacy
              selectedMedication={selectedMedication}
              selectedVariant={selectedVariant}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              configuredStates={configuredStates}
              setConfiguredStates={setConfiguredStates}
              data={id ? singleAccessControl : variantAccessControlData}
            />
          </div>
        ) : (
          <div
            className="flex flex-col gap-3 w-full items-center justify-center min-h-[423px] h-[423px] bg-white rounded-[15px]"
            style={{ boxShadow: "0px 2px 40px 0px hsla(0, 0%, 0%, 0.05)" }}
          >
            <div className="rounded-full flex items-center justify-center bg-light-background h-[68px] w-[68px]">
              <MedicationLibrary />
            </div>
            <p className="font-semibold text-[18px] leading-[26px] text-black">
              Select Medication & Variant
            </p>
            <span className="font-normal text-[14px] max-w-[471px] leading-[18px] text-center text-gray-400">
              Choose a medication and variant from the left panel to start
              managing pharmacy assignments across all 50 US states.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessDetail;
