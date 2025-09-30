import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import InputElement from "@/components/Form/input-element";

// import PhoneInputElement from "@/components/Form/phone-input-element";

import { toast } from "sonner";

import SelectElement from "@/components/Form/select-element";

import { inviteAdminSchema } from "@/schemas/createOrganizationSchema";
import { CenteredRow } from "@/components/ui/centered-row";
import {
  useInviteOrgAdminMutation,
  useViewAllOrganizationQuery,
} from "@/redux/services/admin";
import { useCallback, useState } from "react";

export default function InviteOrganizationAdmin() {
  const [inviteOrgAdmin] = useInviteOrgAdminMutation();
  const [searchParams, setSearchParams] = useState("");
  const { data: organizationData } = useViewAllOrganizationQuery(
    {
      page: 1,
      perPage: 20,
      q: searchParams,
    },
    {
      selectFromResult: ({ data }) => ({
        data:
          data?.data?.map((item) => ({
            value: item.id,
            label: item?.name ?? "",
          })) ?? [],
      }),
    }
  );

  const form = useForm<z.infer<typeof inviteAdminSchema>>({
    mode: "onChange",
    resolver: zodResolver(inviteAdminSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      businessId: "",
    },
  });

  async function onSubmit(data: z.infer<typeof inviteAdminSchema>) {
    await inviteOrgAdmin(data)
      .unwrap()
      .then((data) => {
        form.reset();
        toast.success(data?.message || "Invitation sent successfully", {
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

  const handleSearchParams = useCallback((value: string) => {
    setSearchParams(value);
  }, []);

  return (
    <>
      <div className="  pt-10 ">
        <div className="mb-10 space-y-2.5">
          <h2 className="font-semibold text-[26px] text-center">
            Invite Organization Admin with CTRL
          </h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 mt-6 items-center"
          >
            <CenteredRow>
              <InputElement
                name="firstName"
                className="w-80"
                label="FirstName"
                messageClassName="text-right"
                placeholder="Enter first name... "
                inputClassName="border border-[#9EA5AB]"
              />

              <InputElement
                name="lastName"
                className="w-80"
                label="LastName"
                messageClassName="text-right"
                placeholder="Enter last name... "
                inputClassName="border border-[#9EA5AB]"
              />
            </CenteredRow>

            <CenteredRow>
              <InputElement
                name="email"
                className="w-80"
                label="Email"
                messageClassName="text-right"
                placeholder="Enter email address"
                inputClassName="border border-[#9EA5AB]"
                autoComplete="email"
                isRequired={true}
              />

              <SelectElement
                name={"businessId"}
                options={organizationData ?? []}
                label="Select Organization"
                isRequired={true}
                placeholder="Select Organization"
                className="w-80 min-h-[56px] "
                triggerClassName="border border-[#9EA5AB]"
                onSearch={handleSearchParams}
                searchValue={searchParams}
                errorClassName="text-right"
              />
            </CenteredRow>

            {/* <PhoneInputElement
              name="phoneNumber"
              className="w-[600px]"
              label="Phone Number"
              isRequired={true}
              placeholder="(123) 132-1312"
              messageClassName="text-right"
              inputClassName=" shadow-none focus-visible:ring-0 focus-visible:border-none"
            /> */}

            <div className="flex justify-center mt-6 ">
              <Button
                disabled={!form.formState.isValid}
                type="submit"
                className="text-white rounded-full py-2.5 px-7 min-h-14 text-base font-semibold"
              >
                Send Invitation
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
