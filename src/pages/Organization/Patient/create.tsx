import { createPatientFormSchema } from "@/schemas/createPatientSchema";
import { useForm } from "react-hook-form";
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
      address: "",
      dob: "",
      height: 0,
      weight: 0,
    },
  });

  const { reset } = form;

  async function onSubmit(values: z.infer<typeof createPatientFormSchema>) {
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

      <div className="flex justify-center w-full mt-6">
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
                />

                <InputElement
                  name="lastName"
                  className="w-80"
                  label="Last Name"
                  isRequired={true}
                  messageClassName="text-right"
                  placeholder="Smith"
                />
              </CenteredRow>

              <InputElement
                name="email"
                className="w-full "
                label="Email"
                isRequired={true}
                messageClassName="text-right"
                placeholder="Eg john@example.com"
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
                />
              </CenteredRow>

              <InputElement
                name="address"
                className="w-full "
                label="Address"
                isRequired={true}
                messageClassName="text-right"
                placeholder="eg Street, California, USA"
              />

              <p className="text-lg font-semibold my-2.5">
                Add Patient Diagnostics
              </p>

              <InputElement
                name="medicationAllergies"
                className="w-full"
                label="Medication Allergies"
                messageClassName="text-right"
                placeholder="Eg.Penicillin, Shellfish"
              />

              <InputElement
                name="currentMedications"
                className="w-full"
                label="Current Medications"
                messageClassName="text-right"
                placeholder="Eg. Metformin 500mg, Lisinopril 10mg"
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
                    inputClassName="max-w-[285px]"
                    placeholder="170"
                  />
                  <InputElement
                    name={`weight`}
                    label="Weight(pounds)"
                    isRequired={true}
                    type="number"
                    inputClassName="max-w-[285px]"
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
