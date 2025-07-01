import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { registerProviderFormSchema } from "@/schemas/register-provider-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CenteredRow } from "@/components/ui/centered-row";
import { RequiredLabel } from "@/components/ui/required-label";

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
    <div className="bg-background px-40 pt-20">
      <div className="px-64 pt-12 bg-white min-h-[690px] rounded-4xl">
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
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-80 ">
                    <RequiredLabel required={true}>First Name</RequiredLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-right" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-80">
                    <RequiredLabel required={true}>Last Name</RequiredLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-right" />
                  </FormItem>
                )}
              />
            </CenteredRow>

            <CenteredRow>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-80">
                    <RequiredLabel required={true}>Email</RequiredLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-right" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-80">
                    <RequiredLabel required={true}>Phone</RequiredLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-right" />
                  </FormItem>
                )}
              />
            </CenteredRow>

            <CenteredRow>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-80">
                    <RequiredLabel required={true}>Password</RequiredLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage className="text-right" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="w-80">
                    <RequiredLabel required={true}>
                      Confirm Password
                    </RequiredLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage className="text-right" />
                  </FormItem>
                )}
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
