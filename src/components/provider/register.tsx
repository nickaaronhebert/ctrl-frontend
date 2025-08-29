import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { registerProviderFormSchema } from "@/schemas/register-provider-schema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CenteredRow } from "@/components/ui/centered-row";

import InputElement from "@/components/Form/input-element";
import { useNavigate } from "react-router-dom";
import PasswordInputElement from "@/components/Form/password-element";
import { useTypedSelector } from "@/redux/store";
import { toast } from "sonner";
import { useAcceptProviderInvitationMutation } from "@/redux/services/provider";
import { selectProvider } from "@/redux/slices/auth";
import PhoneInputElement from "../Form/phone-input-element";

export default function RegisterProvider() {
  const provider = useTypedSelector(selectProvider);
  const provider_token = localStorage.getItem("provider_token");
  const [acceptInvitation] = useAcceptProviderInvitationMutation();

  const form = useForm<z.infer<typeof registerProviderFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(registerProviderFormSchema),
    defaultValues: {
      firstName: provider?.firstName || "",
      lastName: provider?.lastName || "",
      email: provider?.email || "",
      phoneNumber: provider?.phoneNumber || "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();
  async function onSubmit(data: z.infer<typeof registerProviderFormSchema>) {
    const { firstName, lastName, phoneNumber, password } = data;
    const payload = {
      firstName,
      lastName,

      phoneNumber,
      password,
      token: provider_token,
    };
    await acceptInvitation(payload)
      .unwrap()
      .then(() => {
        toast.success("Invitation accepted successfully", {
          duration: 1500,
        });
        navigate("/welcome");
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
      <div className="mb-10 space-y-2.5">
        <h2 className="font-semibold text-[26px] text-center">
          Personalize your provider profile
        </h2>
        <h4 className="text-muted-foreground text-center font-normal text-base">
          Registration in less than a minute
        </h4>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-6 "
        >
          <CenteredRow>
            <InputElement
              name="firstName"
              className="w-80"
              label="First Name"
              isRequired={true}
              messageClassName="text-right"
              inputClassName="border border-[#9EA5AB]"
            />

            <InputElement
              name="lastName"
              className="w-80"
              label="Last Name"
              isRequired={true}
              messageClassName="text-right"
              inputClassName="border border-[#9EA5AB]"
            />
          </CenteredRow>

          <CenteredRow>
            <InputElement
              name="email"
              className="w-80"
              label="Email"
              isLoginLabel={true}
              messageClassName="text-right"
              disabled={true}
              inputClassName="bg-disabled  border border-[#9EA5AB]"
            />

            <PhoneInputElement
              name="phoneNumber"
              className="w-80"
              label="Phone Number"
              isRequired={true}
              messageClassName="text-right"
              inputClassName=" shadow-none focus-visible:ring-0 focus-visible:border-none"
            />
          </CenteredRow>

          <CenteredRow>
            <PasswordInputElement
              name="password"
              className="w-80"
              label="Create Password"
              isRequired={true}
              messageClassName="text-right"
              inputClassName="border border-[#9EA5AB]"
            />

            <PasswordInputElement
              name="confirmPassword"
              className="w-80"
              label="Confirm Password"
              isRequired={true}
              messageClassName="text-right"
              inputClassName="border border-[#9EA5AB]"
            />
          </CenteredRow>

          <div className="flex justify-center mt-6">
            <Button
              disabled={!form.formState.isValid}
              type="submit"
              className="text-white rounded-full py-2.5 px-7 min-h-14 text-base font-semibold"
            >
              Review & Create Profile
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
