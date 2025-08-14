import { useOrderMultiStepForm } from "@/hooks/use-order-multistepform";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "../ui/multi-select";
import { Card, CardContent } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { useEffect, useState } from "react";
import { PatientSearch } from "../common/PatientSearch/PatientSearch";
import { orderFormDefaults } from "@/schemas/order-form-defaults";
import type { Patient } from "@/types/global/commonTypes";

const PatientForm = () => {
  const { handleNext } = useOrderMultiStepForm();
  const form = useFormContext();

  const { control } = form;
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // const patientData = dummyPatients.find((p) => p.id === selectedPatientId);

  const options = [
    { value: "Aspirin", label: "Aspirin" },
    { value: "Codeine", label: "Codeine" },
    { value: "Penicillin", label: "Penicillin" },
    { value: "Ibuprofen", label: "Ibuprofen" },
  ];

  const currentMedicationOptions = [
    { value: "Amoxicillin 500mg", label: "Amoxicillin 500mg" },
    { value: "Lisinopril 10mg", label: "Lisinopril 10mg" },
    { value: "Metformin 850mg", label: "Metformin 850mg" },
  ];

  const conditionOptions = [
    { value: "Hypertension", label: "Hypertension" },
    { value: "Diabetes", label: "Diabetes" },
    { value: "Asthma", label: "Asthma" },
  ];

  useEffect(() => {
    if (selectedPatient) {
      form.reset({
        ...form.getValues(),
        ...selectedPatient,
      });
    } else {
      form.reset(orderFormDefaults);
    }
  }, [selectedPatient]);

  return (
    <>
      <div className="px-40 min-h-[500px]">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Select a Patient to Proceed
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            If patient is not listed,{" "}
            <span className="text-blue-600 cursor-pointer">Create Patient</span>
          </p>
        </div>

        <PatientSearch
          selectedPatient={selectedPatient}
          onSelect={(patient) => setSelectedPatient(patient)}
        />

        {/* Show form data when a patient is selected */}

        {selectedPatient && (
          <>
            {/* Patient Details */}
            <div className="my-5">
              <h3 className="font-semibold text-gray-900 mb-4">
                Patient Details
              </h3>
              <Card className="w-full bg-slate-100">
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-1">
                    <div className="flex justify-between items-center  ">
                      <span className="text-sm text-gray-600 font-medium">
                        Full Name
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {selectedPatient?.firstName} {selectedPatient?.lastName}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 font-medium">
                        Email
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {selectedPatient?.email}
                      </span>
                    </div>
                    <div className="flex justify-between items-center  ">
                      <span className="text-sm text-gray-600 font-medium">
                        Phone Number
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {selectedPatient?.phoneNumber}
                      </span>
                    </div>
                    <div className="flex justify-between items-center ">
                      <span className="text-sm text-gray-600 font-medium">
                        Gender
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {selectedPatient?.gender}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 font-medium">
                        DOB
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {selectedPatient?.dob}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Add Patient Diagnostics */}
            <div className="space-y-4 mt-5">
              <h3 className="font-semibold text-gray-900">
                Add Patient Diagnostics
              </h3>

              {/* Medication Allergies */}
              <FormField
                control={control}
                name="medicationAllergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Medication Allergies{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={options}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Select medication allergies..."
                        variant="secondary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Current Medications */}
              <FormField
                control={control}
                name="currentMedications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Current Medications{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={currentMedicationOptions}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Select medications..."
                        variant="secondary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Diagnosed Conditions */}
              <FormField
                control={control}
                name="diagnosedConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Diagnosed Conditions{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={conditionOptions}
                        placeholder="Select conditions..."
                        variant="secondary"
                        value={field.value || []}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Vital Signs */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-4 mt-5">
              <h3 className="font-semibold text-gray-900">Vital Signs</h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="vitalSigns.bloodPressure"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Blood Pressure{" "}
                        <span className="text-gray-500 text-xs">(mmHg)</span>{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="120/80"
                          className="mt-1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="vitalSigns.heartRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Heart Rate{" "}
                        <span className="text-gray-500 text-xs">(bpm)</span>{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                          placeholder="85"
                          className="mt-1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Physical Measurements */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <h3 className="font-semibold text-gray-900">
                Physical Measurements
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="vitalSigns.height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Height{" "}
                        <span className="text-gray-500 text-xs">(cm)</span>{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                          placeholder="170"
                          className="mt-1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="vitalSigns.weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Weight{" "}
                        <span className="text-gray-500 text-xs">(kg)</span>{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                          placeholder="70"
                          className="mt-1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="border-t border-dotted border-gray-300 mt-6" />

      <div className="flex justify-end mt-6 items-center gap-2.5 ">
        <Button
          variant={"outline"}
          disabled={!form.formState.isValid}
          onClick={() => {
            setSelectedPatient(null);
            form.reset(orderFormDefaults);
          }}
          // disabled={!form.formState.isValid}
          className="cursor-pointer text-black rounded-full py-2.5 px-7 min-h-14 text-base font-semibold"
        >
          Cancel
        </Button>
        <Button
          onClick={handleNext}
          disabled={!form.formState.isValid}
          className="cursor-pointer text-white rounded-full py-2.5 px-7 min-h-14 text-base font-semibold"
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default PatientForm;
