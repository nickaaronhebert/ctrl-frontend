import SelectElement from "@/components/Form/select-element";
import { Button } from "@/components/ui/button";
import { useOrderMultiStepForm } from "@/hooks/use-order-multistepform";

const providerOptions = [
  {
    label: "Dr. Emily Johnson",
    value: "9867564534",
  },
  {
    label: "Dr Tony Stark",
    value: "657845495",
  },
  {
    label: "Dr. John Snow",
    value: "5432134567",
  },
  {
    label: "Dr. Rob Stark",
    value: "7865678987",
  },
];

const pharmacyOptions = [
  { label: "HealthFirst Pharmacy", value: "healthfirst_pharmacy" },
  { label: "WellCare Pharmacy", value: "wellcare_pharmacy" },
  { label: "MediTrust Pharmacy", value: "meditrust_pharmacy" },
  { label: "CarePlus Pharmacy", value: "careplus_pharmacy" },
  { label: "PharmaZone", value: "pharmazone" },
  { label: "GoodHealth Pharmacy", value: "goodhealth_pharmacy" },
  { label: "LifeLine Pharmacy", value: "lifeline_pharmacy" },
  { label: "QuickMeds", value: "quickmeds" },
  { label: "WellnessRx", value: "wellnessrx" },
  { label: "TrustMed Pharmacy", value: "trustmed_pharmacy" },
];

export default function SelectProviderPharmacy() {
  const { handleNext, handleBack } = useOrderMultiStepForm();
  return (
    <div>
      <div className="flex flex-col items-center">
        <div className=" min-w-[550px] max-w-[550px]">
          <p className="text-[20px] font-semibold">
            Select Provider & Pharmacy
          </p>

          <div className="mt-3.5">
            <SelectElement
              name="selectProvider"
              options={providerOptions}
              label="Select Provider"
              isRequired={true}
              className="w-[500px] min-h-[56px]"
              placeholder="Select the option"
            />

            <SelectElement
              name="selectPharmacy"
              options={pharmacyOptions}
              label="Select Pharmacy"
              isRequired={true}
              className="w-[500px] min-h-[56px]"
              placeholder="Select the option"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-10 border-t border-card-border pt-10">
        <Button
          variant={"outline"}
          onClick={handleBack}
          className="rounded-full min-h-[48px] min-w-[130px] text-[14px] font-semibold "
        >
          Back
        </Button>

        <Button
          onClick={handleNext}
          className="rounded-full min-h-[48px] min-w-[130px] text-[14px] font-semibold text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
