import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField } from "@/components/ui/form";
import { patientSchema } from "@/schemas/patientSchema";
import { Button } from "@/components/ui/button";
import { PatientSearch } from "@/components/common/PatientSearch/PatientSearch";
import { Card, CardContent } from "@/components/ui/card";
import { useAppDispatch } from "@/redux/store";
import InputElement from "@/components/Form/input-element";
import {
  updateInitialStep,
  type PATIENT_DETAILS,
} from "@/redux/slices/create-order";
import { formatDateMMDDYYYY } from "@/lib/utils";
import type { Address } from "@/types/global/commonTypes";
import { Link } from "react-router-dom";

export default function SelectPatient({
  patient,
}: {
  patient: PATIENT_DETAILS;
}) {
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof patientSchema>>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      selectedPatient: patient.selectedPatient,
      firstName: patient.firstName,
      lastName: patient.lastName,
      phoneNumber: patient.phoneNumber,
      email: patient.email,
      gender: patient.gender,
      dob: patient.dob,
      medicationAllergies: patient.medicationAllergies,
      currentMedications: patient.currentMedications,
      height: patient.height,
      weight: patient.weight,
      address: patient.address,
    },
  });

  const { watch } = form;
  const selectedPatient = watch("selectedPatient");

  async function onSubmit(values: z.infer<typeof patientSchema>) {
    dispatch(updateInitialStep(values));
  }

  console.log("errors", form.formState.errors);
  return (
    <>
      <div className="px-40 min-h-[500px]">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Select a Patient to Proceed
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            If patient is not listed,{" "}
            <Link
              to={"/org/create-patient"}
              className="text-[#008CE3]  cursor-pointer underline underline-offset-2"
            >
              Create Patient
            </Link>
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              control={form.control}
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
                      form.setValue("dob", formatDateMMDDYYYY(patient.dob));
                      form.setValue(
                        "medicationAllergies",
                        patient.medicationAllergies
                      );
                      form.setValue(
                        "currentMedications",
                        patient.currentMedications
                      );
                      form.setValue(
                        "address",
                        patient.addresses.filter(
                          (address: Address) => address.isDefault === true
                        )[0]
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
                            {selectedPatient?.firstName}{" "}
                            {selectedPatient?.lastName}
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
                            {formatDateMMDDYYYY(selectedPatient?.dob)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Add Patient Diagnostics */}
                <div>
                  <h3 className="font-semibold text-gray-900 my-5">
                    Add Latest Patient Diagnostics
                  </h3>

                  {/* Medication Allergies */}
                  <InputElement
                    name="medicationAllergies"
                    label="Medication Allergies"
                    placeholder="Eg.Penicillin, Shellfish"
                    readOnly={true}
                  />

                  <InputElement
                    name="currentMedications"
                    label="Current Medications"
                    placeholder="Eg. Metformin 500mg, Lisinopril 10mg"
                    readOnly={true}
                  />
                </div>

                <div className="bg-[#F6F8F9]  rounded-lg  border border-[#D9D9D9] ">
                  <h3 className="font-semibold text-gray-900 p-4">
                    Physical Measurements
                  </h3>
                  <div className="grid grid-cols-2 gap-4 bg-white px-4 py-2.5 rounded-bl-lg rounded-br-lg border-t border-[#D9D9D9]">
                    <InputElement
                      name={`height`}
                      label="Height (inches)"
                      isRequired={true}
                      type="number"
                      placeholder="170"
                      readOnly={true}
                    />
                    <InputElement
                      name={`weight`}
                      label="Weight (pounds)"
                      isRequired={true}
                      type="number"
                      placeholder="70"
                      readOnly={true}
                    />
                  </div>
                </div>
              </>
            )}

            {selectedPatient && (
              <div className="flex justify-end mt-6 items-center gap-2.5 border-t border-dashed border-gray-300 ">
                <Button
                  type="submit"
                  // disabled={!form.formState.isValid}
                  className="rounded-full min-h-[48px] min-w-[130px] text-[14px] font-semibold text-white mt-6 cursor-pointer"
                >
                  Next
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>
    </>
  );
}
