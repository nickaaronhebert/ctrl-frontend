import InputElement from "@/components/Form/input-element";
import { Form } from "@/components/ui/form";
import { editProfileSchema } from "@/schemas/editProfileSchema";
import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { CenteredRow } from "@/components/ui/centered-row";
import PhoneInputElement from "@/components/Form/phone-input-element";
import useAuthentication from "@/hooks/use-authentication";
import { useEditProfileMutation } from "@/redux/services/authApi";
import { toast } from "sonner";
export default function PharmacyProfileSettings() {
  const { user } = useAuthentication();
  const [editProfile] = useEditProfileMutation();
  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phoneNumber: user?.phoneNumber || "",
      email: user?.email || "",
    },
  });

  async function onSubmit(values: z.infer<typeof editProfileSchema>) {
    const { email, ...payload } = values;
    await editProfile(payload)
      .unwrap()
      .then(() => {
        toast.success("User Updated Successfully", {
          duration: 1500,
        });
      })
      .catch((err) => {
        console.log("error", err);
        toast.error(err?.data?.message ?? "Something went wrong", {
          duration: 3000,
        });
      });
  }

  return (
    <div className="min-h-[500px] w-full bg-white rounded-bl-[15px] rounded-br-[15px] flex justify-center pt-8">
      <div className="w-[540px]">
        <p className="text-xl font-semibold">Profile Information</p>
        <div className="py-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <div>
                <CenteredRow>
                  <InputElement
                    name={`firstName`}
                    label="First Name"
                    isRequired={true}
                    inputClassName="w-[260px] border border-border"
                  />

                  <InputElement
                    name={`lastName`}
                    label="Last Name"
                    isRequired={true}
                    inputClassName="w-[260px] border border-border"
                  />
                </CenteredRow>

                <CenteredRow>
                  <InputElement
                    name={`email`}
                    label="Email"
                    isRequired={true}
                    disabled={true}
                    inputClassName="w-[260px] disabled:cursor-not-allowed border border-border bg-muted"
                  />
                  <PhoneInputElement
                    name="phoneNumber"
                    className="w-[260px]"
                    label="Phone Number"
                    isRequired={true}
                    messageClassName="text-right"
                    inputClassName="!border-border shadow-none focus-visible:ring-0 focus-visible:border-none"
                  />
                </CenteredRow>

                <div className="flex justify-end   pt-3">
                  <Button type="submit" variant={"ctrl"} size={"xl"}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
