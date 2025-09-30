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
import SelectElement from "@/components/Form/select-element";
import { Link, useNavigate } from "react-router-dom";

export const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];
export default function CreatePharmacy() {
  const navigate = useNavigate();
  const [createPharmacy] = useCreatePharmacyMutation();
  const form = useForm<z.infer<typeof createPharmacySchema>>({
    mode: "onChange",
    resolver: zodResolver(createPharmacySchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      allowedStates: [],
      address: {
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipcode: "",
        country: "United States",
        isDefault: true,
      },
    },
  });

  async function onSubmit(data: z.infer<typeof createPharmacySchema>) {
    await createPharmacy(data)
      .unwrap()
      .then(() => {
        form.reset();
        toast.success("Pharmacy created successfully", {
          duration: 1500,
        });
        navigate("/admin/pharmacies");
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
      <div className="">
        {/* <div className="min-w-[1440px]:px-64 px-10 pt-12 bg-white min-h-[690px] rounded-4xl"> */}
        <div className=" bg-[#EFE8F5] py-3 px-12">
          <Link
            to={"/admin/pharmacies"}
            className="font-normal text-sm text text-muted-foreground"
          >
            {"<- Back to Pharmacies"}
          </Link>

          <h1 className="text-2xl font-bold mt-1">Create Pharmacy</h1>
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
              placeholder="Enter Pharmacy Name"
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
              label="Select Allowed States"
              options={USA_STATES}
              className="w-[600px] "
              placeholder="Select states  "
              messageClassName="text-right"
              isRequired={true}
            />

            <CenteredRow>
              <InputElement
                name={`address.address1`}
                className="w-[290px]"
                label="Address Line 1"
                isRequired={true}
                messageClassName="text-right"
                placeholder="1247 Broadway Street"
                inputClassName="border-border"
              />

              <InputElement
                name={`address.address2`}
                className="w-[290px]"
                label="Address Line 2"
                // isRequired={true}
                messageClassName="text-right"
                inputClassName="border-border"
              />
            </CenteredRow>
            <CenteredRow>
              <InputElement
                name={`address.city`}
                className="w-[290px]"
                label="City"
                isRequired={true}
                messageClassName="text-right"
                inputClassName="border-border"
              />
              <SelectElement
                name={`address.state`}
                options={USA_STATES}
                label="State"
                isRequired={true}
                placeholder="Select a State"
                className="w-[290px] min-h-[56px] border-border"
                errorClassName="text-right"
              />
            </CenteredRow>
            <CenteredRow>
              <InputElement
                name={`address.zipcode`}
                className="w-[290px]"
                label="Zip Code"
                isRequired={true}
                messageClassName="text-right"
                inputClassName="border-border"
                // placeholder="1247 Broadway Street"
              />

              <InputElement
                name={`address.country`}
                className="w-[290px]"
                label="Country"
                isRequired={true}
                messageClassName="text-right"
                inputClassName="bg-[#C3C1C6] border border-[#9EA5AB]"
                disabled={true}
              />
            </CenteredRow>

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
