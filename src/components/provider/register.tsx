import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { registerProviderFormSchema } from "@/schemas/register-provider-schema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CenteredRow } from "@/components/ui/centered-row";

import InputElement from "@/components/Form/input-element";

export default function RegisterProvider() {
  const form = useForm<z.infer<typeof registerProviderFormSchema>>({
    resolver: zodResolver(registerProviderFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof registerProviderFormSchema>) {
    console.log("Form Data:", data);
    // Here you would typically send the data to your backend API
  }

  return (
    <div className="bg-background lg:px-40 pt-20 px-10">
      <div className="[min-width:1440px]:px-64 pt-12 bg-white min-h-[690px] rounded-4xl">
        <div className="mb-10">
          <h2 className="font-semibold text-3xl text-center">
            Personalize your provider profile
          </h2>
          <h4 className="text-muted-foreground text-center font-normal text-xl mt-1">
            Registration takes 3-5 minutes
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
              />

              <InputElement
                name="lastName"
                className="w-80"
                label="Last Name"
                isRequired={true}
                messageClassName="text-right"
              />
            </CenteredRow>

            <CenteredRow>
              <InputElement
                name="email"
                className="w-80"
                label="Email"
                isRequired={true}
                messageClassName="text-right"
              />

              <InputElement
                name="phone"
                className="w-80"
                label="Phone"
                isRequired={true}
                messageClassName="text-right"
              />
            </CenteredRow>

            <CenteredRow>
              <InputElement
                name="password"
                className="w-80"
                label="Password"
                isRequired={true}
                messageClassName="text-right"
              />

              <InputElement
                name="confirmPassword"
                className="w-80"
                label="Confirm Password"
                isRequired={true}
                messageClassName="text-right"
              />
            </CenteredRow>

            <div className="flex justify-center mt-6">
              <Button
                type="submit"
                className="text-white rounded-full py-2.5 px-7 min-h-14 text-base font-semibold"
              >
                Review and Crete Profile
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
