import { useOrderMultiStepForm } from "@/hooks/use-order-multistepform";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { PatientSearch } from "../common/PatientSearch/PatientSearch";
import { orderFormDefaults } from "@/schemas/order-form-defaults";
import { Textarea } from "../ui/textarea";

const PatientForm = () => {
  const { handleNext } = useOrderMultiStepForm();
  const form = useFormContext();

  const { control, watch } = form;
  const selectedPatient = watch("selectedPatient");

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

        <FormField
          control={control}
          name="selectedPatient"
          render={({ field }) => (
            <PatientSearch
              selectedPatient={field.value}
              onSelect={(patient) => {
                field.onChange(patient);

                if (patient) {
                  form.setValue("firstName", patient.firstName);
                  form.setValue("lastName", patient.lastName);
                  form.setValue("email", patient.email);
                  form.setValue("phoneNumber", patient.phoneNumber);
                  form.setValue("gender", patient.gender);
                  form.setValue("dob", patient.dob);
                  form.setValue(
                    "medicationAllergies",
                    patient.medicationAllergies
                  );
                  form.setValue(
                    "currentMedications",
                    patient.currentMedications
                  );

                  form.setValue("height", patient.height ?? "");
                  form.setValue("weight", patient.weight ?? "");
                }
              }}
            />
          )}
        />

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
                      Medication Allergies
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter medication allergies"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
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
                      <Textarea
                        placeholder="Enter medications"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Physical Measurements */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <h3 className="font-semibold text-gray-900">
                Physical Measurements
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Height{" "}
                        <span className="text-gray-500 text-xs">(in)</span>{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          value={field.value ?? ""} // ensure controlled
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? undefined
                                : +e.target.value
                            )
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
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Weight{" "}
                        <span className="text-gray-500 text-xs">(pounds)</span>{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          value={field.value ?? ""} // ensure controlled
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? undefined
                                : +e.target.value
                            )
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

      {selectedPatient && (
        <div className="flex justify-end mt-6 items-center gap-2.5 ">
          <Button
            variant={"outline"}
            // disabled={!form.formState.isValid}
            onClick={() => {
              form.reset(orderFormDefaults);
            }}
            className="cursor-pointer text-black rounded-full py-2.5 px-7 min-h-14 text-base font-semibold"
          >
            Cancel
          </Button>
          <Button
            onClick={handleNext}
            // disabled={!form.formState.isValid}
            className="cursor-pointer text-white rounded-full py-2.5 px-7 min-h-14 text-base font-semibold"
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default PatientForm;
