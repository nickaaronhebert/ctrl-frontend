import { Form } from "@/components/ui/form";
import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { editPasswordSchema } from "@/schemas/onboardingSchema";
import PasswordInputElement from "@/components/Form/password-element";
import { useUpdatePasswordMutation } from "@/redux/services/authApi";
import { toast } from "sonner";
export default function OrgAdminPasswordSettings() {
  const [changePassword] = useUpdatePasswordMutation();
  const form = useForm<z.infer<typeof editPasswordSchema>>({
    resolver: zodResolver(editPasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof editPasswordSchema>) {
    console.log("values", values);
    const { confirmNewPassword, ...payload } = values;
    await changePassword(payload)
      .unwrap()
      .then((data) => {
        toast.success(data?.message || "Password Updated Successfully", {
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
        <p className="text-xl font-semibold">Change Password</p>
        <div className="py-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <div>
                <PasswordInputElement
                  name={`currentPassword`}
                  label="Current Password"
                  inputClassName="w-full"
                  isRequired={true}
                  messageClassName="text-right"
                />

                <PasswordInputElement
                  name={`newPassword`}
                  label="New Password"
                  inputClassName="w-full"
                  isRequired={true}
                  messageClassName="text-right"
                />

                <PasswordInputElement
                  name={`confirmNewPassword`}
                  label="Confirm New Password"
                  inputClassName="w-full"
                  isRequired={true}
                  messageClassName="text-right"
                />

                <div className="flex justify-end   pt-3">
                  <Button
                    type="submit"
                    variant={"ctrl"}
                    size={"xl"}
                    // className="rounded-full min-h-[48px] min-w-[130px] text-[14px] font-semibold text-white cursor-pointer"
                  >
                    Change Password
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
