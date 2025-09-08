import { createPatientFormSchema } from "@/schemas/createPatientSchema";
import { useFieldArray, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CenteredRow } from "@/components/ui/centered-row";
import InputElement from "@/components/Form/input-element";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCreatePatientMutation } from "@/redux/services/patientApi";

import DateInputElement from "@/components/Form/date-input-element";
import PhoneInputElement from "@/components/Form/phone-input-element";
import SelectElement from "@/components/Form/select-element";
import { USA_STATES } from "@/constants";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";

export default function CreatePatient() {
  const navigate = useNavigate();
  const [createPatient] = useCreatePatientMutation();
  const form = useForm<z.infer<typeof createPatientFormSchema>>({
    mode: "onTouched",
    resolver: zodResolver(createPatientFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      medicationAllergies: "",
      currentMedications: "",
      addresses: [
        {
          address1: "",
          address2: "",
          city: "",
          state: "",
          zipcode: "",
          country: "United States",
          isDefault: true,
        },
      ],

      dob: "",
      height: 0,
      weight: 0,
    },
  });

  const { reset } = form;

  async function onSubmit(values: z.infer<typeof createPatientFormSchema>) {
    console.log("values", values);
    await createPatient({ ...values, gender: "Male" })
      .unwrap()
      .then((data) => {
        toast.success(data?.message || "Patient Created Successfully", {
          duration: 1500,
        });

        reset();
        navigate("/org/patients");
      })
      .catch((err) => {
        console.log("error", err);
        toast.error(err?.data?.message ?? "Something went wrong", {
          duration: 3000,
        });
      });
  }

  const { fields, append, remove } = useFieldArray({
    name: "addresses",
    control: form.control,
  });

  const setDefaultAddress = (index: number) => {
    form.setValue(
      "addresses",
      fields.map((field, i) => ({
        ...field,
        isDefault: i === index,
      }))
    );
  };

  return (
    <>
      <div className=" bg-[#EFE8F5] py-3 px-12">
        <Link
          to={"/org/patients"}
          className="font-normal text-sm text text-muted-foreground"
        >
          {"<- Back to Patients"}
        </Link>

        <h1 className="text-2xl font-bold mt-1">Create Patient</h1>
      </div>

      <div className="flex justify-center w-full my-6">
        <div className="w-[700px]  p-5 bg-white rounded-2xl shadow-[0px_8px_10px_0px_#00000014]">
          <p className="text-lg font-semibold">Patient Information</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <CenteredRow>
                <InputElement
                  name="firstName"
                  className="w-80"
                  label="First Name"
                  isRequired={true}
                  messageClassName="text-right"
                  placeholder="John"
                  inputClassName="border-border"
                />

                <InputElement
                  name="lastName"
                  className="w-80"
                  label="Last Name"
                  isRequired={true}
                  messageClassName="text-right"
                  placeholder="Smith"
                  inputClassName="border-border"
                />
              </CenteredRow>

              <InputElement
                name="email"
                className="w-full "
                label="Email"
                isRequired={true}
                messageClassName="text-right"
                placeholder="Eg john@example.com"
                inputClassName="border-border"
              />

              <CenteredRow>
                <PhoneInputElement
                  name="phoneNumber"
                  className="w-80"
                  label="Phone"
                  isRequired={true}
                  messageClassName="text-right"
                  placeholder="eg. (555) 123-4567"
                />

                <DateInputElement
                  name="dob"
                  className="w-80"
                  label="DOB"
                  isRequired={true}
                  messageClassName="text-right"
                  placeholder="MM/DD/YYYY"
                  inputClassName="border-border"
                />
              </CenteredRow>

              {/* <InputElement
                name="address"
                className="w-full "
                label="Address"
                isRequired={true}
                messageClassName="text-right"
                placeholder="eg Street, California, USA"
              /> */}
              <div className="mt-6 ">
                <div className="flex justify-between mb-1.5">
                  <p className="text-lg font-semibold">Address</p>
                  <span
                    className="text-sm font-normal text-[#008CE3] underline underline-offset-1 cursor-pointer"
                    onClick={() =>
                      append({
                        address1: "",
                        address2: "",
                        city: "",
                        state: "",
                        zipcode: "",
                        country: "United States",
                        isDefault: false,
                      })
                    }
                  >
                    Add Another Address
                  </span>
                </div>
                {fields.map((field, index) => {
                  const isDefault = form.watch(`addresses.${index}.isDefault`);
                  return (
                    <div
                      key={field.id}
                      className={cn(
                        "border-b border-card-border",
                        index > 0 ? "mt-6" : ""
                      )}
                    >
                      <div
                        className={cn(
                          "mb-4",
                          isDefault ? "" : "flex justify-end"
                        )}
                      >
                        {isDefault && (
                          <span className="bg-pending-secondary text-[#D56E01]  text-xs font-normal py-1 px-2 rounded-[5px]">
                            Default Address
                          </span>
                        )}
                        {!isDefault && (
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isDefault}
                              onChange={() => setDefaultAddress(index)}
                            />
                            Set as default
                          </label>
                        )}
                      </div>
                      <CenteredRow>
                        <InputElement
                          name={`addresses.${index}.address1`}
                          className="w-80"
                          label="Address Line 1"
                          isRequired={true}
                          messageClassName="text-right"
                          placeholder="1247 Broadway Street"
                          inputClassName="border-border"
                        />

                        <InputElement
                          name={`addresses.${index}.address2`}
                          className="w-80"
                          label="Address Line 2"
                          // isRequired={true}
                          messageClassName="text-right"
                          inputClassName="border-border"
                        />
                      </CenteredRow>
                      <CenteredRow>
                        <InputElement
                          name={`addresses.${index}.city`}
                          className="w-80"
                          label="City"
                          isRequired={true}
                          messageClassName="text-right"
                          inputClassName="border-border"
                        />
                        <SelectElement
                          name={`addresses.${index}.state`}
                          options={USA_STATES}
                          label="State"
                          isRequired={true}
                          placeholder="Select a State"
                          className="w-80 min-h-[56px] border-border"
                          errorClassName="text-right"
                        />
                      </CenteredRow>
                      <CenteredRow>
                        <InputElement
                          name={`addresses.${index}.zipcode`}
                          className="w-80"
                          label="Zip Code"
                          isRequired={true}
                          messageClassName="text-right"
                          inputClassName="border-border"
                          // placeholder="1247 Broadway Street"
                        />

                        <InputElement
                          name={`addresses.${index}.country`}
                          className="w-80"
                          label="Country"
                          isRequired={true}
                          messageClassName="text-right"
                          inputClassName="bg-[#C3C1C6] border border-[#9EA5AB]"
                          disabled={true}
                        />
                      </CenteredRow>
                      <div
                        className={cn(
                          "mb-2 flex justify-end items-center gap-1 text-failed text-xs font-normal",
                          index === 0 ? "hidden" : ""
                        )}
                      >
                        <Trash2 stroke="#E31010" size={12} />
                        <span
                          className="cursor-pointer"
                          onClick={() => remove(index)}
                        >
                          Delete
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="text-lg font-semibold my-2.5">
                Add Patient Diagnostics
              </p>

              <InputElement
                name="medicationAllergies"
                className="w-full"
                label="Medication Allergies"
                messageClassName="text-right"
                placeholder="Eg.Penicillin, Shellfish"
                inputClassName="border-border"
              />

              <InputElement
                name="currentMedications"
                className="w-full"
                label="Current Medications"
                messageClassName="text-right"
                placeholder="Eg. Metformin 500mg, Lisinopril 10mg"
                inputClassName="border-border"
              />

              <div className="bg-[#F6F8F9]  rounded-lg  border border-[#D9D9D9] mt-3.5">
                <h3 className="font-semibold text-gray-900 p-4 border-b border-[#D9D9D9]">
                  Physical Measurements
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-white px-4 py-2.5 rounded-bl-lg rounded-br-lg">
                  <InputElement
                    name={`height`}
                    label="Height(inches)"
                    isRequired={true}
                    type="number"
                    inputClassName="max-w-[285px] border-border"
                    placeholder="170"
                  />
                  <InputElement
                    name={`weight`}
                    label="Weight(pounds)"
                    isRequired={true}
                    type="number"
                    inputClassName="max-w-[285px] border-border"
                    placeholder="70"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 mt-10">
                <Link
                  to={"#"}
                  className="rounded-full border border-[#3E4D61] text-center py-2.5 px-6 min-h-12 min-w-32"
                >
                  Cancel
                </Link>
                <Button
                  type="submit"
                  className="rounded-full text-white cursor-pointer py-2.5 px-6 min-h-12 min-w-32"
                >
                  Create
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
