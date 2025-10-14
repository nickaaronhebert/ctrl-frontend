import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import InputElement from "@/components/Form/input-element";

import PhoneInputElement from "@/components/Form/phone-input-element";

import { toast } from "sonner";

import { createOrganizationSchema } from "@/schemas/createOrganizationSchema";
// import { useCreateOrganizationMutation } from "@/redux/services/admin";
import { CenteredRow } from "@/components/ui/centered-row";
import SelectElement from "@/components/Form/select-element";
import { USA_STATES } from "@/constants";
import { Link, useNavigate } from "react-router-dom";
import { useCreateSubOrganizationMutation } from "@/redux/services/admin";

export default function CreateSubOrganization() {
  const navigate = useNavigate();
  const [createOrg] = useCreateSubOrganizationMutation();
  const form = useForm<z.infer<typeof createOrganizationSchema>>({
    mode: "onChange",
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
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

  async function onSubmit(data: z.infer<typeof createOrganizationSchema>) {
    await createOrg(data)
      .unwrap()
      .then(() => {
        form.reset();
        toast.success("Sub-Organization created successfully", {
          duration: 1500,
        });
        // navigate("/admin/organizations");
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
            to={"/admin/organizations"}
            className="font-normal text-sm text text-muted-foreground"
          >
            {"<- Back to Sub-organizations"}
          </Link>

          <h1 className="text-2xl font-bold mt-1">Create Sub-organization</h1>
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
              autoComplete="name"
            />

            <InputElement
              name="email"
              className="w-[600px]"
              label="Email"
              messageClassName="text-right"
              placeholder="Enter email address"
              inputClassName="border border-[#9EA5AB]"
              autoComplete="email"
            />

            <PhoneInputElement
              name="phoneNumber"
              className="w-[600px]"
              label="Phone Number"
              isRequired={true}
              placeholder="(123) 132-1312"
              messageClassName="text-right"
              inputClassName=" shadow-none focus-visible:ring-0 focus-visible:border-none"
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

            {/* <CenteredRow> */}
            {/* <SelectElement
                  name={"status"}
                  options={statusOptions}
                  label="Select Status"
                  isRequired={true}
                  triggerClassName="w-full min-h-[56px] border border-[#9EA5AB]"
                  className="w-[290px] "
                /> */}

            {/* </CenteredRow> */}

            <div className="flex justify-center mt-6">
              <Button
                disabled={!form.formState.isValid}
                type="submit"
                className="text-white rounded-full py-2.5 px-7 min-h-14 text-base font-semibold"
              >
                Create Organization
              </Button>
            </div>
          </form>
        </Form>
        {/* </div> */}
      </div>
    </>
  );
}
