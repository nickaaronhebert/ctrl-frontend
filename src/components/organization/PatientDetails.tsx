import { useState } from "react";
import { Search, X } from "lucide-react";
import { useOrderMultiStepForm } from "@/hooks/use-order-multistepform";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "../ui/multi-select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";

const PatientForm = () => {
  const { handleNext } = useOrderMultiStepForm();
  const form = useFormContext();

  const { control, handleSubmit, setValue } = form;
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  console.log("Checking if form state is validddd", form.formState);

  const patientData = {
    fullName: "Sarah Johnson",
    phoneNumber: "(553) 163-4902",
    email: "sarah.johnson@company.com",
    gender: "Female",
    dob: "1/15/1988",
  };

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

  return (
    <>
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          Select a Patient to Proceed
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          If patient is not listed,{" "}
          <span className="text-blue-600 cursor-pointer">Create Patient</span>
        </p>
      </div>
      <FormField
        control={control}
        name="searchTerm"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="relative">
                <Input
                  {...field}
                  placeholder="Search patients..."
                  className="pr-16 pl-3"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setValue("searchTerm", "")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Patient Details */}
      <div className="space-y-4 mt-5">
        <h3 className="font-semibold text-gray-900">Patient Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <Label className="text-gray-600">Full Name</Label>
            <div className="font-medium">{patientData.fullName}</div>
          </div>
          <div>
            <Label className="text-gray-600">Phone Number</Label>
            <div className="font-medium">{patientData.phoneNumber}</div>
          </div>
          <div>
            <Label className="text-gray-600">Email</Label>
            <div className="font-medium text-blue-600">{patientData.email}</div>
          </div>
          <div>
            <Label className="text-gray-600">Gender</Label>
            <div className="font-medium">{patientData.gender}</div>
          </div>
          <div>
            <Label className="text-gray-600">DOB</Label>
            <div className="font-medium">{patientData.dob}</div>
          </div>
        </div>
      </div>

      {/* Add Patient Diagnostics */}
      <div className="space-y-4 mt-5">
        <h3 className="font-semibold text-gray-900">Add Patient Diagnostics</h3>

        {/* Medication Allergies */}
        <FormField
          control={control}
          name="medicationAllergies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Medication Allergies <span className="text-red-500">*</span>
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
                Current Medications <span className="text-red-500">*</span>
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
                Diagnosed Conditions <span className="text-red-500">*</span>
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
                  <Input {...field} placeholder="120/80" className="mt-1" />
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
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
        <h3 className="font-semibold text-gray-900">Physical Measurements</h3>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="vitalSigns.height"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Height <span className="text-gray-500 text-xs">(cm)</span>{" "}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
                  Weight <span className="text-gray-500 text-xs">(kg)</span>{" "}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
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

      <div className="flex justify-center mt-6 items-center gap-2.5 ">
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
