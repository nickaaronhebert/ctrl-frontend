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
import { updateStepOne } from "@/redux/slices/sub-org";
import { CenteredRow } from "@/components/ui/centered-row";
import SelectElement from "@/components/Form/select-element";
import { USA_STATES } from "@/constants";
import { useNavigate } from "react-router-dom";
import { useCreateSubOrganizationMutation } from "@/redux/services/admin";
import type { SubOrganizationDetails } from "@/redux/slices/sub-org";
import { useAppDispatch } from "@/redux/store";

interface CreateSubOrganizationProps {
  organizationDetails: SubOrganizationDetails;
}

export default function CreateSubOrganization({
  organizationDetails,
}: CreateSubOrganizationProps) {
  const navigate = useNavigate();
  const [createOrg] = useCreateSubOrganizationMutation();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof createOrganizationSchema>>({
    mode: "onChange",
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: organizationDetails?.name || "",
      email: organizationDetails?.email || "",
      phoneNumber: organizationDetails?.phoneNumber || "",
      address: {
        address1: organizationDetails?.address?.address1 || "",
        address2: organizationDetails?.address?.address2 || "",
        city: organizationDetails?.address?.city || "",
        state: organizationDetails?.address?.state || "",
        zipcode: organizationDetails?.address?.zipcode || "",
        country: "United States",
        isDefault: organizationDetails?.address?.isDefault,
      },
    },
  });

  async function onSubmit(data: z.infer<typeof createOrganizationSchema>) {
    dispatch(updateStepOne(data));
    console.log("first step data", data);
    await createOrg(data)
      .unwrap()
      .then(() => {
        form.reset();
        toast.success("Sub-Organization created successfully", {
          duration: 1500,
        });
        navigate("/org/sub-orgs");
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
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 mt-6 items-center "
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

            <div className="flex justify-center mt-6 gap-2 border-t w-full border-card-border border-dashed">
              <Button
                type="button"
                className="rounded-full bg-transparent text-black border hover:bg-transparent cursor-pointer py-2.5 px-7 min-h-14 text-base font-semibold mt-10"
              >
                Cancel
              </Button>
              <Button
                disabled={!form.formState.isValid}
                type="submit"
                className="text-white rounded-full py-2.5 px-7 min-h-14 cursor-pointer text-base font-semibold mt-10"
              >
                Next Billing Setup
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
