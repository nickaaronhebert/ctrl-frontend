import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import InputElement from "@/components/Form/input-element";

import PhoneInputElement from "@/components/Form/phone-input-element";

import { toast } from "sonner";

import { inviteProviderSchema } from "@/schemas/createOrganizationSchema";
import { CenteredRow } from "@/components/ui/centered-row";
import { useInviteProviderMutation } from "@/redux/services/admin";
import useAuthentication from "@/hooks/use-authentication";
import { Link, useNavigate } from "react-router-dom";

export default function InviteProvider() {
  const { user } = useAuthentication();
  const navigate = useNavigate();
  const [inviteProvider] = useInviteProviderMutation();

  const form = useForm<z.infer<typeof inviteProviderSchema>>({
    mode: "onChange",
    resolver: zodResolver(inviteProviderSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      npi: "",
    },
  });

  async function onSubmit(data: z.infer<typeof inviteProviderSchema>) {
    const businessId = user?.organization?._id ?? "";
    await inviteProvider({ ...data, businessId })
      .unwrap()
      .then((data) => {
        form.reset();
        toast.success(data?.message || "Invitation sent successfully", {
          duration: 1500,
        });
        navigate("/org/providers");
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
      <div className=" bg-[#EFE8F5] py-3 px-12">
        <Link
          to={"/org/providers"}
          className="font-normal text-sm text text-muted-foreground"
        >
          {"<- Back to Providers"}
        </Link>

        <h1 className="text-2xl font-bold mt-1">Invite Provider</h1>
      </div>

      <div className="flex justify-center w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 mt-6 items-center p-10 rounded-2xl bg-white shadow-[0px_8px_10px_0px_#00000014]"
          >
            <CenteredRow>
              <InputElement
                name="firstName"
                className="w-80"
                label="First Name"
                messageClassName="text-right"
                placeholder="Enter first name... "
                inputClassName="border border-[#9EA5AB]"
              />

              <InputElement
                name="lastName"
                className="w-80"
                label="Last Name"
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
              <PhoneInputElement
                name="phone"
                className="w-80"
                label="Phone Number"
                placeholder="(123) 132-1312"
                messageClassName="text-right"
                inputClassName=" shadow-none focus-visible:ring-0 focus-visible:border-none"
              />
            </CenteredRow>

            <InputElement
              name="npi"
              className="w-full"
              label="NPI"
              messageClassName="text-right"
              placeholder="Prescriber NPI Id"
              inputClassName="border border-[#9EA5AB]"
              isRequired={true}
            />

            <div className="flex justify-center mt-6 ">
              <Button
                // disabled={!form.formState.isValid}
                type="submit"
                className="text-white rounded-full py-2.5 px-7 min-h-14 text-base font-semibold cursor-pointer"
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
