import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import InputElement from "@/components/Form/input-element";

import PhoneInputElement from "@/components/Form/phone-input-element";

import { toast } from "sonner";

import { CenteredRow } from "@/components/ui/centered-row";

import { createPharmacySchema } from "@/schemas/createOrganizationSchema";
import { USA_STATES } from "@/constants";
import { useCreatePharmacyMutation } from "@/redux/services/admin";
import MultiSelectElement from "@/components/Form/multi-select-element";

export const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];
export default function CreatePharmacy() {
  //   const navigate = useNavigate();
  const [createPharmacy] = useCreatePharmacyMutation();
  const form = useForm<z.infer<typeof createPharmacySchema>>({
    mode: "onChange",
    resolver: zodResolver(createPharmacySchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      allowedStates: [],
    },
  });

  async function onSubmit(data: z.infer<typeof createPharmacySchema>) {
    await createPharmacy(data)
      .unwrap()
      .then(() => {
        toast.success("Pharmacy created successfully", {
          duration: 1500,
        });
      })
      .catch((err) => {
        console.log("error", err);
        toast.error(err?.data?.message ?? "Something went wrong", {
          duration: 1500,
        });
      });
  }

  return (
    <>
      <div className=" pt-10 ">
        {/* <div className="min-w-[1440px]:px-64 px-10 pt-12 bg-white min-h-[690px] rounded-4xl"> */}
        <div className="mb-10 space-y-2.5">
          <h2 className="font-semibold text-[26px] text-center">
            Register Pharmacy with CTRL
          </h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 mt-6 items-center"
          >
            <InputElement
              name="name"
              className="w-[600px]"
              label="Name"
              isRequired={true}
              messageClassName="text-right"
              placeholder="Enter Organization Name"
              inputClassName="border border-[#9EA5AB]"
            />

            <CenteredRow>
              {/* <SelectElement
                  name={"allowedStates"}
                  options={USA_STATES}
                  label="State"
                  isRequired={true}
                  placeholder="Select a State"
                  className="w-80 min-h-[56px] border-border"
                  errorClassName="text-right"
                /> */}

              {/* <SelectElement
                  name={"status"}
                  options={statusOptions}
                  label="Select Status"
                  isRequired={true}
                  triggerClassName="w-full min-h-[56px] border border-[#9EA5AB]"
                  className="w-80 "
                /> */}

              <InputElement
                name="email"
                className="w-[290px]"
                label="Email"
                messageClassName="text-right"
                placeholder="Enter email address"
                inputClassName="border border-[#9EA5AB]"
                isRequired={true}
              />

              <PhoneInputElement
                name="phoneNumber"
                className="w-[290px]"
                label="Phone Number"
                isRequired={true}
                placeholder="(123) 132-1312"
                messageClassName="text-right"
                inputClassName=" shadow-none focus-visible:ring-0 focus-visible:border-none"
              />
            </CenteredRow>

            <MultiSelectElement
              name="allowedStates"
              label="Select States"
              options={USA_STATES}
              className="w-[600px] "
              placeholder="Select states  "
              messageClassName="text-right"
              isRequired={true}
            />

            <div className="flex justify-center mt-6">
              <Button
                disabled={!form.formState.isValid}
                type="submit"
                className="text-white rounded-full py-2.5 px-7 min-h-14 text-base font-semibold"
              >
                Create Pharmacy
              </Button>
            </div>
          </form>
        </Form>
        {/* </div> */}
      </div>
    </>
  );
}
