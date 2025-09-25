import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import InputElement from "@/components/Form/input-element";

import PhoneInputElement from "@/components/Form/phone-input-element";

import { toast } from "sonner";

import { createOrganizationSchema } from "@/schemas/createOrganizationSchema";
import { useCreateOrganizationMutation } from "@/redux/services/admin";

export const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];
export default function CreateOrganization() {
  //   const navigate = useNavigate();
  const [createOrg] = useCreateOrganizationMutation();
  const form = useForm<z.infer<typeof createOrganizationSchema>>({
    mode: "onChange",
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
    },
  });

  async function onSubmit(data: z.infer<typeof createOrganizationSchema>) {
    await createOrg(data)
      .unwrap()
      .then(() => {
        toast.success("Organization created successfully", {
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
      <div className="  pt-10 ">
        {/* <div className="min-w-[1440px]:px-64 px-10 pt-12 bg-white min-h-[690px] rounded-4xl"> */}
        <div className="mb-10 space-y-2.5">
          <h2 className="font-semibold text-[26px] text-center">
            Register Organization with CTRL
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

            <InputElement
              name="email"
              className="w-[600px]"
              label="Email"
              messageClassName="text-right"
              placeholder="Enter email address"
              inputClassName="border border-[#9EA5AB]"
            />

            {/* <CenteredRow> */}
            {/* <SelectElement
                  name={"status"}
                  options={statusOptions}
                  label="Select Status"
                  isRequired={true}
                  triggerClassName="w-full min-h-[56px] border border-[#9EA5AB]"
                  className="w-80 "
                /> */}

            <PhoneInputElement
              name="phoneNumber"
              className="w-[600px]"
              label="Phone Number"
              isRequired={true}
              placeholder="(123) 132-1312"
              messageClassName="text-right"
              inputClassName=" shadow-none focus-visible:ring-0 focus-visible:border-none"
            />
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
