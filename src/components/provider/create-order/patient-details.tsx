import InputElement from "@/components/Form/input-element";
import MultiSelectElement from "@/components/Form/multi-select-element";
import SelectElement from "@/components/Form/select-element";

import { Button } from "@/components/ui/button";
import { useOrderMultiStepForm } from "@/hooks/use-order-multistepform";
// import { useMultiStepForm } from "@/hooks/usemultistepForm";

const medicationAllergies = [
  { label: "Penicillin", value: "penicillin" },
  { label: "Aspirin", value: "aspirin" },
  { label: "Ibuprofen", value: "ibuprofen" },
  { label: "Amoxicillin", value: "amoxicillin" },
  { label: "Cephalosporins", value: "cephalosporins" },
  { label: "Sulfa Drugs (Sulfonamides)", value: "sulfa_drugs" },
  { label: "Codeine", value: "codeine" },
  { label: "Morphine", value: "morphine" },
  { label: "Tetracycline", value: "tetracycline" },
  { label: "Erythromycin", value: "erythromycin" },
  { label: "Naproxen", value: "naproxen" },
  { label: "Vancomycin", value: "vancomycin" },
  { label: "Clindamycin", value: "clindamycin" },
  { label: "NSAIDs (Non-Steroidal Anti-Inflammatory Drugs)", value: "nsaids" },
  { label: "Insulin (animal-derived)", value: "insulin_animal" },
  { label: "Local Anesthetics (e.g., Lidocaine)", value: "local_anesthetics" },
  { label: "Contrast Dye (Iodine-based)", value: "contrast_dye" },
  {
    label: "Fluoroquinolones (e.g., Ciprofloxacin)",
    value: "fluoroquinolones",
  },
  { label: "Macrolides (e.g., Azithromycin)", value: "macrolides" },
  { label: "Anticonvulsants (e.g., Phenytoin)", value: "anticonvulsants" },
];

const currentMedicationOptions = [
  { value: "Amoxicillin 500mg", label: "Amoxicillin 500mg" },
  { value: "Lisinopril 10mg", label: "Lisinopril 10mg" },
  { value: "Metformin 850mg", label: "Metformin 850mg" },
];

const diagnosedConditions = [
  { label: "Hypertension (High Blood Pressure)", value: "hypertension" },
  { label: "Diabetes Mellitus Type 1", value: "diabetes_type_1" },
  { label: "Diabetes Mellitus Type 2", value: "diabetes_type_2" },
  { label: "Asthma", value: "asthma" },
  { label: "Chronic Obstructive Pulmonary Disease (COPD)", value: "copd" },
  { label: "Coronary Artery Disease", value: "coronary_artery_disease" },
  { label: "Congestive Heart Failure", value: "congestive_heart_failure" },
  { label: "Hyperlipidemia (High Cholesterol)", value: "hyperlipidemia" },

  { label: "Peptic Ulcer Disease", value: "peptic_ulcer" },
  { label: "Anemia", value: "anemia" },
  { label: "HIV/AIDS", value: "hiv_aids" },
  { label: "Tuberculosis", value: "tuberculosis" },
  { label: "Migraine", value: "migraine" },
  { label: "Multiple Sclerosis", value: "multiple_sclerosis" },
  { label: "Parkinson’s Disease", value: "parkinsons_disease" },
  { label: "Alzheimer’s Disease / Dementia", value: "dementia" },
];

const userOptions = [
  {
    value: "user1",
    label: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    dob: "12/20/2001",
  },
  {
    value: "user2",
    label: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "987-654-3210",
    dob: "03/15/1998",
  },
  {
    value: "user3",
    label: "Robert Brown",
    email: "robert.brown@example.com",
    phone: "555-123-4567",
    dob: "07/09/1995",
  },
  {
    value: "user4",
    label: "Emily Johnson",
    email: "emily.j@example.com",
    phone: "444-987-6543",
    dob: "11/02/2000",
  },
  {
    value: "user5",
    label: "Michael Lee",
    email: "michael.lee@example.com",
    phone: "333-222-1111",
    dob: "06/25/1993",
  },
  {
    value: "user6",
    label: "Sophia Davis",
    email: "sophia.davis@example.com",
    phone: "222-333-4444",
    dob: "09/17/1999",
  },
  {
    value: "user7",
    label: "Daniel Wilson",
    email: "daniel.w@example.com",
    phone: "111-555-7777",
    dob: "01/30/1990",
  },
];

export default function PatientDetails() {
  const { handleNext } = useOrderMultiStepForm();

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className=" min-w-[550px] max-w-[550px]">
          <div className=" flex justify-between mb-3">
            <p className="text-[20px] font-semibold">
              Select a Patient to Proceed
            </p>
          </div>
          <div className="">
            <SelectElement
              name={`selectedPatient`}
              options={userOptions}
              isRequired={true}
              className="w-[550px] min-h-[56px]"
              displayKeys={["label", "phone", "dob"]}
              placeholder="Select a Patient"
            />

            <p className="text-base font-semibold my-2.5">
              Add Patient Diagnostics
            </p>

            <MultiSelectElement
              name="medicationAllergies"
              label="Medication Allergies"
              className="w-[550px]"
              options={medicationAllergies}
              isRequired={true}
              messageClassName="text-right"
              placeholder="Select allergies"
            />

            <MultiSelectElement
              name="currentMedications"
              label="Current Medications"
              className="w-[550px]"
              options={currentMedicationOptions}
              isRequired={true}
              messageClassName="text-right"
              placeholder="Select medications"
            />

            <MultiSelectElement
              name="diagnosedConditions"
              label="Diagnosed Conditions"
              className="w-[550px]"
              options={diagnosedConditions}
              isRequired={true}
              messageClassName="text-right"
              placeholder="Select conditions"
            />
          </div>
          <div className="bg-[#F6F8F9]  rounded-lg  border border-[#D9D9D9] ">
            <h3 className="font-semibold text-gray-900 p-4">Vital Signs</h3>
            <div className="grid grid-cols-2 gap-4 bg-white px-4 py-2.5 rounded-bl-lg rounded-br-lg">
              <InputElement
                name={`vitalSigns.bloodPressure`}
                label="Blood Pressure(mm/Hg)"
                placeholder="120/80"
                isRequired={true}
                inputClassName="max-w-[225px]"
              />
              <InputElement
                name={`vitalSigns.heartRate`}
                label="Heart Rate(bpm)"
                placeholder="72"
                isRequired={true}
                type="number"
                inputClassName="max-w-[225px]"
              />
            </div>
          </div>
          <div className="bg-[#F6F8F9]  rounded-lg  border border-[#D9D9D9] mt-3.5">
            <h3 className="font-semibold text-gray-900 p-4">
              Physical Measurements
            </h3>
            <div className="grid grid-cols-2 gap-4 bg-white px-4 py-2.5 rounded-bl-lg rounded-br-lg">
              <InputElement
                name={`vitalSigns.height`}
                label="Height(cm)"
                isRequired={true}
                type="number"
                inputClassName="max-w-[225px]"
                placeholder="170"
              />
              <InputElement
                name={`vitalSigns.weight`}
                label="Weight(lbs)"
                isRequired={true}
                type="number"
                inputClassName="max-w-[225px]"
                placeholder="70"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-10 border-t border-card-border pt-10">
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
